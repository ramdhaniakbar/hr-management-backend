import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import { BreakType } from './break-type.model';
import { BreakTypeDto } from './dto';

@Injectable()
export class BreakTypeService {
    constructor(@InjectModel('BreakType')private readonly breakTypetModel: Model<BreakType>){}

    async createBreakType(user:any, breakTypeDto: BreakTypeDto ){
        const newBreakType = new this.breakTypetModel(
            {
            company: user.company, 
            breakName: breakTypeDto.breakName, 
            breakTime:breakTypeDto.breakTime, 
            createdBy: user.sub 
        })
        await newBreakType.save()
        return newBreakType;
    }

    async getAllBreakType(user: any){
        const breakTypes =  await this.breakTypetModel.find({company: user.company});
        let result = []
        breakTypes.map((i, index)=>{
            result.push({
                _id: i._id,
                company: i.company,
                breakName: i.breakName,
                breakTime:[],
                createdAt: i.createdAt.toLocaleString(),
                createdBy: i.createdBy,
            })
            i.breakTime.map((bt)=>{
                result[index].breakTime.push({breakIn: bt.breakIn.toLocaleString(), breakOut: bt.breakOut.toLocaleString()})
            })
        })
        return result;
    }

    async deleteBreakType( id: any){
        await this.findOneBreakType
        const breakTypes =  await this.breakTypetModel.deleteOne({_id: id._id})
        return breakTypes;
    }

    async findOneBreakType( id: any){
        const breakType =  await this.breakTypetModel.findById(id)
        if(!breakType){
            throw new NotFoundException("no break type founf with the id: "+ id)
        }
        let result = {
            _id: breakType._id,
             company: breakType.company,
             breakName: breakType.breakName,
             breakTime:[],
             createdAt: breakType.createdAt.toLocaleString(),
             createdBy: breakType.createdBy,
        }
        breakType.breakTime.map((i)=>{
            result.breakTime.push({breakIn: i.breakIn.toLocaleString(), breakOut: i.breakOut.toLocaleString()})
         })
        
        return result;
    }


}
