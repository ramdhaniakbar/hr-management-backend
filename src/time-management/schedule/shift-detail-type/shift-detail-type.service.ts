import { Injectable, ForbiddenException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { shiftDetailTypeDto } from './dto';
import { ShiftDetailType } from './shift-detail-type.model';

@Injectable()
export class ShiftDetailTypeService {
    constructor(@InjectModel('ShiftDetailType')private readonly shiftDetailTypeModel: Model<ShiftDetailType>){}

    async createShiftDetailType(user:any, shiftDetailType: shiftDetailTypeDto ){
        const result = await this.shiftDetailTypeModel.create({
            company: user.company,
            createdBy: user.sub,
            shiftName: shiftDetailType.shiftName,
            in: shiftDetailType.in,
            out: shiftDetailType.out,
            breakOut: shiftDetailType.breakOut,
            breakIn: shiftDetailType.breakIn,
            otBefore: shiftDetailType.otBefore,
            otAfter: shiftDetailType.otAfter,
            breakType: shiftDetailType.breakType,
            hideInRequest: shiftDetailType.hideInRequest,
        })

        return result 
    }

    async findOneShiftDetailType (user:any, id:any){
        const shiftDetailType = await this.shiftDetailTypeModel.findById(id)
        if(!shiftDetailType){
            throw new NotFoundException("no shift detail type found with the id: "+id)
        }
        let result = shiftDetailType.toObject()
        result.in = result.in.toLocaleString()
        result.out =result.out.toLocaleString()
        result.breakIn = result.breakIn.toLocaleString()
        result.breakOut =result.breakOut.toLocaleString()
        result.otBefore = result.otBefore.toLocaleString()
        result.otAfter =result.otAfter.toLocaleString()
        result.createdAt =result.createdAt.toLocaleString()

        return result;
    }

    async findAllShiftDetailType(user:any){
        const shiftDetailTypes= await this.shiftDetailTypeModel.find({company: user.company})
    
        if(shiftDetailTypes.length == 0){
            throw new NotFoundException("no shift detail type found with the your company id ")
        }
        let result = shiftDetailTypes.map((i)=>{
            return i.toObject()
        })
        result.map((i)=>{
            i.in = i.in.toLocaleString()
            i.out =i.out.toLocaleString()
            i.breakIn = i.breakIn.toLocaleString()
            i.breakOut =i.breakOut.toLocaleString()
            i.otBefore = i.otBefore.toLocaleString()
            i.otAfter =i.otAfter.toLocaleString()
            i.createdAt =i.createdAt.toLocaleString()
        })
        return result
    }

    async deleteOneShiftDetailType(user:any, id:any){
        await this.findOneShiftDetailType(user, id)
        const deletedShiftDetailType = await this.shiftDetailTypeModel.deleteOne({_id:id})
        return deletedShiftDetailType
    }

    // async editShiftDetailType(user:any, edit:any){

    // }

}
