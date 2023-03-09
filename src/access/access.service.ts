import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/users/users.service';
import { Access } from './access.model';
import { AccessDto } from './dto';
import { roleTypes } from './enum';

@Injectable()
export class AccessService {
    constructor(@InjectModel('Access')private readonly accessModel: Model<Access>,
                private userService: UserService){}

    async addAccessSuper(accessDto: AccessDto, userDoc: any){
        const user =  await this.userService.findUserById(userDoc)
        try{
            const newAccess = new this.accessModel({...accessDto, createdBy: user, company:user})
            await newAccess.save()
            newAccess.populate('createdBy'),
            newAccess.populate('menuAccess.menu'),
            newAccess.populate('company')
            return newAccess;
        }catch(err){
            if(err.code == 11000){
                throw new ForbiddenException("there is already a role with the name: "+accessDto.roleName)
            }else{
                throw err;
            }
        }
    }

    async createSuperAdmin(superAd:any){
        const newSuper = new this.accessModel(superAd);
        await newSuper.save();
        return newSuper
    }

    async findSuperCompany(user:any){
        const superAdmin = this.accessModel.find({company:user.sub, roleType: roleTypes.superAdmin})
        return superAdmin;
    }
    async addAccessAdmin(accessDto:AccessDto, user:any){
        try{
            const newAccess = new this.accessModel({...accessDto, createdBy: user.sub, company:user.company})
            await newAccess.save()
            await newAccess.populate('createdBy'),
            await newAccess.populate('menuAccess.menu'),
            await newAccess.populate('company')
            return newAccess;
        }catch(err){
            if(err.code == 11000){
                throw new ForbiddenException("there is already a role with the name: "+accessDto.roleName)
            }else{
                throw err;
            }
        }
    }

    async getRole(userDoc: any ){
        const user = await this.userService.findUserById(userDoc)
        if(!user.jobLevel || !user.organization ){
            const role = await this.accessModel.find({company: user.company, "filterEmployee.superAdmin": user._id}).populate("menuAccess.menu").select("roleName roleType menuAccess")
            return role;  
        }else{
            
            const role = await this.accessModel.find({
                $and:[
               { company: user.company },
                { 
                    "filterEmployee.organization": { $in : [user.organization] },
                    "filterEmployee.jobLevel": { $in : [user.jobLevel] }
                }
                ]
            }).populate("menuAccess.menu").select("roleName roleType menuAccess")
            return userDoc;
        }
    }

    async menuUpdateSuperAdmin(menus: any){
        const updateAccess =await this.accessModel.updateMany({roleType: roleTypes.superAdmin}, {$push: {menuAccess:{menu :menus._id, view: true, add: true, edit: true, delete: true, request: false, wholeCompany: true}}})
        return true;
    }

    async menuDeleteSuperAdmin(menus:any){
        const deleteMenuAccess = await this.accessModel.updateMany({roleType: roleTypes.superAdmin, "menuAccess.menu":menus }, {$pull:{menuAccess:{menu:menus}}})
        return deleteMenuAccess
    }
}
