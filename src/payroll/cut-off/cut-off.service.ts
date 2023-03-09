import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import { CutOff } from './cut-off.model';
import { cutOffDto } from './dto';

@Injectable()
export class CutOffService {
    constructor(@InjectModel('CutOff')private readonly cutOffModel: Model<CutOff>){}

    async createCutOff(user:any, cutOff: cutOffDto){
        const alreadyExist = await this.checkCutOff(user)
        if(alreadyExist){
            throw new ForbiddenException("your company already have a cut off default, can't create another one")
        }
        const createdCutOff = instanceToPlain(cutOff)
        createdCutOff.company = user.company
        createdCutOff.updatedBy = user.sub

        const result = await this.cutOffModel.create(createdCutOff)

        return result
    }

    async checkCutOff(user:any){
        const result = await this.cutOffModel.find({company:user.company})

        if(result.length == 0){
            return false
        }
        return true
    }

    async findCutOff(user:any){
        const cutOff = await this.cutOffModel.find({company:user.company})
        if(cutOff.length == 0){
            throw new NotFoundException("there is no cut off in your company")
        }
        let result = cutOff.map((i)=>{ return i.toObject()})

        result.map((i)=>{
            i.updatedAt = i.updatedAt.toLocaleString()
        })

        return result
    }

    async editCutOff(user:any, edit: cutOffDto){
        await this.findCutOff(user)

        let editCutOff = instanceToPlain(edit)
        editCutOff.updatedAt = Date.now()
        editCutOff.updatedBy = user.sub

        const result = await this.cutOffModel.updateOne({company:user.company}, 
            {$set:editCutOff})
            
        return result
    }

}
