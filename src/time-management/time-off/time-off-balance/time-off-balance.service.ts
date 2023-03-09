import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { roundingTypes, timeOffPolicyTypes, timeOffSimulationTypes } from 'src/enum';
import { UserService } from 'src/users/users.service';
import { TimeOffTypePolicySettingService } from '../time-off-type-policy-setting/time-off-type-policy-setting.service';
import { TimeOffTypePolicyService } from '../time-off-type-policy/time-off-type-policy.service';
import { simulateTimeOffBalanceDto } from './dto';
import { TimeOffBalance } from './time-off-balance.model';
const dayjs = require('dayjs')

@Injectable()
export class TimeOffBalanceService {
    constructor(
        @InjectModel('TimeOffBalance')private readonly timeOffBalanceModel: Model<TimeOffBalance>,
        private timeOffTypePolicyService:TimeOffTypePolicyService,
        private timeOffTypePolicySettingService: TimeOffTypePolicySettingService,
        @Inject(forwardRef(()=> UserService))
        private userService: UserService ){}

    async findUserTimeOffBalances(user:any){
        const userTimeOffBalances = await this.timeOffBalanceModel.find({user:user.sub}).populate("policy", "policyName")
        if(userTimeOffBalances.length == 0){
            throw new NotFoundException("the user with the id "+ user.sub+" doesnt have any balance")
        }

        let result = userTimeOffBalances.map((i)=>{
            return i.toObject()
        })

        result.map((i)=>{
            i.timeOffBalance.map((x)=>{
                x.effectiveDate = x.effectiveDate.toLocaleString()
                if(!x.noExpiryDate){
                    x.expiredDate = x.expiredDate.toLocaleString()
                }

            })
            i.createdAt = i.createdAt.toLocaleString()
        })

        return result

    }
    async findOneTimeOffBalanceByTimeOffPolicy(id:any,user:any){
        const timeOffBalance = await this.timeOffBalanceModel.findOne({policy:id, user: user.sub})

        if(!timeOffBalance){
            throw new ForbiddenException("no balance found for user with the time off policy id of: "+ id)
        }

        let result = timeOffBalance.toObject()
        //calculate active balance
        result.activeBalance = 0
        if(!result.unlimitedBalance){
            var dateNow = dayjs(Date.now())
            result.timeOffBalance.map((i)=>{
                var effDate = dayjs(i.effectiveDate)
                var expDate = dayjs(i.expiredDate)
                if(i.noExpiryDate){
                    if(effDate.isBefore(dateNow)){
                        result.activeBalance+i.emergeBalance
                    }
                }else if(effDate.isBefore(dateNow) && expDate.isAfter(dateNow)){
                    result.activeBalance+=i.emergeBalance
                }
            })
        }
        return result
    }

    async createTimeOffBalance(user:any){
        const timeOffBalance = await this.simulateCreateTimeOffBalance(user)
        const createdTimeOffBalance = await this.timeOffBalanceModel.create(timeOffBalance)
        return createdTimeOffBalance
    }

    async simulateTimeOffBalance(user:any,simulationData:simulateTimeOffBalanceDto){

        if(simulationData.simulationType == timeOffSimulationTypes.employee && (simulationData.joinedDate || !simulationData.user)){
            throw new ForbiddenException("there should only be employee data in simulation type employee")
        }
        if(simulationData.simulationType == timeOffSimulationTypes.joinedDate && (!simulationData.joinedDate || simulationData.user)){
            throw new ForbiddenException("there should only be joined date data in simulation type joined date")
        }

        const timeOffPolicy = await this.timeOffTypePolicyService.findOneTimeOffTypePolicy(user,simulationData.policy)
        let simulationUser:any
        if(timeOffPolicy.firstEmergeStatus && timeOffPolicy.firstEmergeStatus.length > 0){
             simulationUser = {employmentStatus:timeOffPolicy.firstEmergeStatus[0].employmentStatus}
        }
        if(simulationData.user){
            simulationUser = await this.userService.findOneUser(simulationData.user)
        }

        var dateNow = dayjs(simulationData.currentDate)
        var joinedDate = dayjs(simulationData.joinedDate)
        if(simulationData.user){
            joinedDate = dayjs(simulationUser.joinedDate)
        }
        var lengthOfServiceYear = dateNow.diff(joinedDate, "y")
        var lengthOfServiceMonth = dateNow.diff(joinedDate, 'M')
        let result 

        if(timeOffPolicy.policyType == timeOffPolicyTypes.anniversary){
            result = this.generateBalanceAnniversary(lengthOfServiceYear,timeOffPolicy,joinedDate)
        }
        if(timeOffPolicy.policyType == timeOffPolicyTypes.monthly){
            result = this.generateBalanceMonthly(lengthOfServiceMonth, simulationUser,timeOffPolicy, joinedDate)
        }
        if(timeOffPolicy.policyType == timeOffPolicyTypes.annually){
            result = this.generateBalanceAnnually(lengthOfServiceYear,simulationUser,timeOffPolicy,joinedDate)
        }

        var expiryDate
        var balance = 0
        result.map((i)=>{

            if(i.noExpiryDate){
                balance = balance + i.emergeBalance
            }else{
                i.expiredDate = i.expiredDate.$d.toLocaleString()
                expiryDate = dayjs(i.expiredDate)
                if(expiryDate.isAfter(dateNow)){
                    balance = balance + i.emergeBalance
                }
            }
            
            i.effectiveDate = i.effectiveDate.$d.toLocaleString()

        })
        return {emergeBalance: result, activeBalance: balance}
    }

    async simulateCreateTimeOffBalance(createdUser:any){
        let timeOffPolicies = await this.timeOffTypePolicyService.filterTimeOffTypePolicy(createdUser)
        if(timeOffPolicies.length == 0){
            return "no time off policies created"
        }

        // !!! setDefaultTimeOffPolicy belum ditest
        //time off policy yang memiliki setting setDefault untuk seluruh employee baru yang join
        const setDefaultTimeOffPolicy = await this.timeOffTypePolicySettingService.findTimeOffSettingSetDefault(null)
        if(setDefaultTimeOffPolicy){
            setDefaultTimeOffPolicy.map((i,index)=>{
                var duplicate = timeOffPolicies.some(value=> value._id == i._id)
                if(!duplicate){
                    timeOffPolicies.push(i)
                }
            })
        }

        let timeOffBalance = timeOffPolicies.map((i)=>{
            let temp:any = {};
            temp.company = createdUser.company
            temp.user = createdUser._id,
            temp.policy = i._id
            temp.unlimitedBalance = i.unlimitedBalances
            if(!temp.unlimitedBalances){
                const dateNow = dayjs(Date.now())
                const joinedDate = dayjs(createdUser.joinedDate)
                var lengthOfServiceMonth = dateNow.diff(joinedDate, "M")
                var lengthOfServiceYear = dateNow.diff(joinedDate, "y")

                //test ketika joinnya sesuai dengan date.now !!!

                if(i.policyType === timeOffPolicyTypes.anniversary){
                    temp.timeOffBalance = this.generateBalanceAnniversary(lengthOfServiceYear, i, joinedDate)
                }
                else if(i.policyType === timeOffPolicyTypes.monthly){
                    //kalau effective from join date maka user akan mendapatkan seluruh akumulasi balance generated sejak joined date user
                    if(i.effectiveFromJoinDate){
                        temp.timeOffBalance = this.generateBalanceMonthly(lengthOfServiceMonth,createdUser, i, joinedDate) 
                    }
                    //kalau tidak effective from join date maka user hanya akan mendapatkan balance setelah user ditambahkan ke aplikasi dan waktu emerge pada policy tiba, sehingga ketika baru diadd employeenya secara default balance generated untuk tiap policy yg user miliki kosong
                    else{
                        temp.timeOffBalance = []
                    }
                    //ketika firstEmerge false maka akan mengikuti emerge day sehingga tidak akan ditambahkan balancenya ketika dicreate
                    //temp.balance = 0
                }
                else if(i.policyType === timeOffPolicyTypes.annually){
                    if(i.effectiveFromJoinDate){
                        temp.timeOffBalance = this.generateBalanceAnnually(lengthOfServiceYear,createdUser, i,joinedDate)
                    }else{
                        temp.timeOffBalance = []
                    }
                }
                if(!temp.balance){
                    temp.balance = 0
                }
            }
            return temp
        })  
        return timeOffBalance
    }

    generateBalanceAnnually(losY:any,user:any, timeOffPolicy:any, joinedDate:any){
        let temp = []
        //melakukan looping untuk setiap bulan length of service month user
        for (let loopIndex = 0; loopIndex <= losY; loopIndex++){
            for (let index = 0; index < timeOffPolicy.balanceGenerated.length; index++){

                //untuk time off policy monthly yg memiliki first emerge
                if(timeOffPolicy.firstEmerge){
                    //untuk yang memiliki first emerge dengan emergeAfter
                    if(timeOffPolicy.emergeAfter && loopIndex < timeOffPolicy.emergeAfter){
                        break
                    }
                    //untuk yang memiliki first emerge dengan first emerge status
                    //check if added employee status is one of the first emerge employment status in the policy
                    else if(timeOffPolicy.firstEmergeStatus != null && timeOffPolicy.firstEmergeStatus.length >= 1 && timeOffPolicy.firstEmergeStatus.some(value => value.employmentStatus == user.employmentStatus).length < 1){
                        break
                    }
                }
                //mengecek apakah user masuk kedalam range balance generated yang ke index looping 
                if( loopIndex >= timeOffPolicy.balanceGenerated[index].from && loopIndex <= timeOffPolicy.balanceGenerated[index].to){

                    //menentukan apakah user mendapatkan saldo pertama pada bulan joined daynya berdasarkan joinedDayRounding 
                    //jika user joinnya pada tanggal setelah joinedDayRoundingnya maka pada bulan pertama user tidak mendapatkan saldo cuti dan saldo cuti dikalkulasi mulai bulan depannya
                    // if(joinedDate.$D > timeOffPolicy.joinedDayRounding  && loopIndex == 0){
                    //     break
                    // }

                    var expDate = 0

                    //effective date di assign menurut ke index berapa yang berarti bulan keberapa employee bekerja
                    var effectiveDate = joinedDate.add(loopIndex, 'y')
                    
                    //effective date di set ke annualDate
                    var annualDate = dayjs(timeOffPolicy.annualDate)
                    effectiveDate= effectiveDate.set('date', annualDate.$D)
                    effectiveDate= effectiveDate.set('month', annualDate.$M)

                    if(joinedDate.isAfter(effectiveDate)){
                        effectiveDate = effectiveDate.add(1, "y")

                    }
                    var noExpDate = false
                    var minimumExpiryMonth =  timeOffPolicy.policyDate?.minimumExpiryMonth
                    var balanceGenerated = timeOffPolicy.balanceGenerated[index].equal 
                    
                    //menambahkan 1 bulan untuk effective datenya karena bulan pertama emergenya tidak dihitung dikarenakan employee joinedDatenya telat dari emergeRounding
                    if(timeOffPolicy.emergeAfter && joinedDate.$D > timeOffPolicy.joinedDayRounding ){
                        effectiveDate = joinedDate.add(loopIndex+1, 'M')
                    }

                    // if(timeOffPolicy.emergeDay.customDays){
                    //     effectiveDate = effectiveDate.date(timeOffPolicy.emergeDay.customDays)
                    // }

                    //melakukan prorate on first emerge pada bulan pertama jika prorate on first emerge true
                    if(loopIndex == 0 && timeOffPolicy.prorateOnFirstEmerge && timeOffPolicy.prorateOnFirstEmerge == true){
                        var lengthOfServiceMonth = effectiveDate.diff(joinedDate,'M')

                        //kalkulasi balance generated bulan pertama employee sesuai dengan sduah berapa bulan employee bekerja saat memunculkan saldo cuti annually pertama kali 
                        balanceGenerated = ((lengthOfServiceMonth/12) * balanceGenerated)

                        //kalkulasi rounding saldo cuti
                        for (let roundingIndex = 0; roundingIndex  < timeOffPolicy.rounding.length; roundingIndex++){
                            var balanceGeneratedDecimal = parseInt((balanceGenerated % 1).toFixed(1).substring(2))
                            if(balanceGeneratedDecimal >= timeOffPolicy.rounding[roundingIndex].from && balanceGeneratedDecimal <= timeOffPolicy.rounding[roundingIndex].to){
                                if(timeOffPolicy.rounding[roundingIndex].rounding === roundingTypes.roundDown){
                                    balanceGenerated = Math.floor(balanceGenerated)
                                    break
                                }else if(timeOffPolicy.rounding[roundingIndex].rounding === roundingTypes.roundUp){
                                    balanceGenerated = Math.floor(balanceGenerated)+1
                                    break
                                }else if(timeOffPolicy.rounding[roundingIndex].rounding === roundingTypes.asItIs){
                                    break
                                }
                            }
                        }
                    }

                    //mengkalkulasi expiry date balance yang digenerated berdasarkan effective date yang telah di assign sebelumnya
                    //pada tipe policy monthly memiliki 4 tipe expired yaitu months, policy expired date, anniversary, dan no expiry date
                    if(timeOffPolicy.months){
                        expDate = effectiveDate.add(timeOffPolicy.months,"M")
                    }else if(timeOffPolicy.policyDate){
                        var expiryDate = dayjs(timeOffPolicy.policyDate.date)

                        if(expiryDate.year()> effectiveDate.year()){
                            expiryDate = expiryDate.subtract(expiryDate.diff(effectiveDate,'y'), 'y')
                        }else if(expiryDate.year()< effectiveDate.year()){
                            expiryDate = expiryDate.add(effectiveDate.diff(expiryDate,'y'), 'y')
                        }

                        //validasi masuk range minimum expiry atau tidak
                        if(expiryDate.diff(effectiveDate, 'M', true) <= minimumExpiryMonth){
                            expiryDate = expiryDate.add(1,'y')
                        }

                        expDate = expiryDate
                    }else if(timeOffPolicy.noExpiryDate){
                        expDate = null
                        noExpDate = true
                    }else if(timeOffPolicy.anniversary){
                        expDate = joinedDate.add(1, 'y')
                    }
                    temp.push({
                        effectiveDate: effectiveDate,
                        expiredDate: expDate,
                        noExpiryDate: noExpDate,
                        emergeBalance: balanceGenerated     
                    })
                    //menghentikan looping balance generated ketika telah menemukan balance generated pertama yang sudah sesuai rangenya dan mengenerate 1 balance pada bulan tersebut
                    break
                }
            }
        }
        return temp

    }

    generateBalanceMonthly(losM:any, user:any, timeOffPolicy:any, joinedDate:any){
        let temp = []
        //melakukan looping untuk setiap bulan length of service month user
        for (let loopIndex = 0; loopIndex <= losM; loopIndex++){
            for (let index = 0; index < timeOffPolicy.balanceGenerated.length; index++){

                //menentukan apakah user mendapatkan saldo pertama pada bulan joined daynya berdasarkan joinedDayRounding 
                //jika user joinnya pada tanggal setelah joinedDayRoundingnya maka pada bulan pertama user tidak mendapatkan saldo cuti dan saldo cuti dikalkulasi mulai bulan depannya
                if(joinedDate.$D > timeOffPolicy.joinedDayRounding  && loopIndex == 0){
                    break
                }
                //untuk time off policy monthly yg memiliki first emerge
                if(timeOffPolicy.firstEmerge){
                    //untuk yang memiliki first emerge dengan emergeAfter
                    if(timeOffPolicy.emergeAfter && loopIndex < timeOffPolicy.emergeAfter){
                        break
                    }
                    //untuk yang memiliki first emerge dengan first emerge status
                    //check if added employee status is one of the first emerge employment status in the policy
                    else if(timeOffPolicy.firstEmergeStatus != null && timeOffPolicy.firstEmergeStatus.length >= 1 && timeOffPolicy.firstEmergeStatus.some(value => value.employmentStatus == user.employmentStatus).length < 1){
                        break
                    }
                }
                //mengecek apakah user masuk kedalam range balance generated yang ke index looping 
                if( loopIndex >= timeOffPolicy.balanceGenerated[index].from && loopIndex <= timeOffPolicy.balanceGenerated[index].to){
                    var expDate = 0

                    //effective date di assign menurut ke index berapa yang berarti bulan keberapa employee bekerja
                    var effectiveDate = joinedDate.add(loopIndex, 'M')
                    var noExpDate = false
                    var minimumExpiryMonth =  timeOffPolicy.policyDate?.minimumExpiryMonth
                    
                    //menambahkan 1 bulan untuk effective datenya karena bulan pertama emergenya tidak dihitung dikarenakan employee joinedDatenya telat dari emergeRounding
                    if(timeOffPolicy.emergeAfter && joinedDate.$D > timeOffPolicy.joinedDayRounding ){
                        effectiveDate = joinedDate.add(loopIndex+1, 'M')
                    }

                    if(timeOffPolicy.emergeDay.customDays){
                        effectiveDate = effectiveDate.date(timeOffPolicy.emergeDay.customDays)
                    }

                    //mengkalkulasi expiry date balance yang digenerated berdasarkan effective date yang telah di assign sebelumnya
                    //pada tipe policy monthly memiliki 4 tipe expired yaitu months, policy expired date, anniversary, dan no expiry date
                    if(timeOffPolicy.months){
                        expDate = effectiveDate.add(timeOffPolicy.months,"M")
                    }else if(timeOffPolicy.policyDate){
                        var expiryDate = dayjs(timeOffPolicy.policyDate.date)

                        if(expiryDate.year()> effectiveDate.year()){
                            expiryDate = expiryDate.subtract(expiryDate.diff(effectiveDate,'y'), 'y')
                        }else if(expiryDate.year()< effectiveDate.year()){
                            expiryDate = expiryDate.add(effectiveDate.diff(expiryDate,'y'), 'y')
                        }

                        //validasi masuk range minimum expiry atau tidak
                        if(expiryDate.diff(effectiveDate, 'M', true) <= minimumExpiryMonth){
                            expiryDate = expiryDate.add(1,'y')
                        }

                        expDate = expiryDate
                    }else if(timeOffPolicy.noExpiryDate){
                        expDate = null
                        noExpDate = true
                    }else if(timeOffPolicy.anniversary){
                        expDate = joinedDate.add(1, 'y')
                    }
                    temp.push({
                        effectiveDate: effectiveDate,
                        expiredDate: expDate,
                        noExpiryDate: noExpDate,
                        emergeBalance: timeOffPolicy.balanceGenerated[index].equal      
                    })
                    //menghentikan looping balance generated ketika telah menemukan balance generated pertama yang sudah sesuai rangenya dan mengenerate 1 balance pada bulan tersebut
                    break
                }
            }
        }
        return temp
    }

    generateBalanceAnniversary(losY:any, timeOffPolicy:any, joinedDate:any){
        let temp = []
            var loopIndex= 0

            //melakukan looping untuk tiap satu tahun length of servicenya pekerja
            for (loopIndex = 0; loopIndex <= losY; loopIndex++){

                //melakukan looping sesuai dengan berapa balance generated yg ada
                for (let index = 0; index < timeOffPolicy.balanceGenerated.length; index++) {
                    if( loopIndex >= timeOffPolicy.balanceGenerated[index].from && loopIndex <= timeOffPolicy.balanceGenerated[index].to){
                        var expDate = 0
                        var noExpDate = false
                        var effectiveDate = joinedDate.add(loopIndex, 'year')
                        var minimumExpiryMonth =  timeOffPolicy.policyDate?.minimumExpiryMonth
                        if(timeOffPolicy.months){
                            expDate = effectiveDate.add(timeOffPolicy.months,"M")
                        }else if(timeOffPolicy.policyDate){
                            var expiryDate = dayjs(timeOffPolicy.policyDate.date)

                            if(expiryDate.year()> effectiveDate.year()){
                                expiryDate = expiryDate.subtract(expiryDate.diff(effectiveDate,'y'), 'y')
                            }else if(expiryDate.year()< effectiveDate.year()){
                                expiryDate = expiryDate.add(effectiveDate.diff(expiryDate,'y'), 'y')
                            }

                            //validasi masuk range minimum expiry atau tidak
                            if(expiryDate.diff(effectiveDate, 'M', true) <= minimumExpiryMonth){
                                expiryDate = expiryDate.add(1,'y')
                            }

                            expDate = expiryDate
                        }else if(timeOffPolicy.noExpiryDate){
                            expDate = null
                            noExpDate = true
                        }

                        temp.push({
                            effectiveDate: effectiveDate,
                            expiredDate: expDate,
                            noExpiryDate: noExpDate,
                            emergeBalance: timeOffPolicy.balanceGenerated[index].equal
                        })

                        //menghentikan looping balance generated ketika telah menemukan balance generated pertama yang sudah sesuai rangenya dan mengenerate 1 balance pada bulan tersebut
                        break;
                    }
                }        
            }
        return temp
    }
}
