import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, subject } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User,UserSchema  } from "src/users/user.model";

export enum Action {
    Manage= "manage",
    Read = "read",
    Create = "create",
    Update = "update",
    Delete = "delete",
    Request = "request",
    Whole = "wholecompany"
}

export type Subjects = InferSubjects<typeof UserSchema> | string | "all";// the entity you want to protect

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
    constructor(@InjectModel('User')private readonly userModel: Model<User>){}
    async defineAbility(user: any, role: any, url: any): Promise<AppAbility>{
        const {can, cannot, build} = new AbilityBuilder(Ability as AbilityClass<AppAbility>)
            if(!role){
                cannot(Action.Manage,"all")
            }else{
                
                role.menuAccess.map((access, index)=>{
                    if(access.view){
                        can(Action.Read, access.menu.controller)
                    } if(access.add){
                        can(Action.Create, access.menu.controller)
                    }if(access.edit){
                       can(Action.Update, access.menu.controller)
                    }if(access.request){
                        can(Action.Request, access.menu.controller)
                    }if(access.wholeCompany){
                        can(Action.Whole, access.menu.controller)
                    }if(access.delete){
                        can(Action.Delete, access.menu.controller)
                    }
                })

                //use for role validation to allow user to view and edit self user data
                //may result in bugss need to be tested
                if(url.includes(user.sub)){
                    can(Action.Read, url)
                    can(Action.Update, url)
                }

                // if(role.roleType === RoleType.superAdmin){
                //     can(Action.Read, "all")
                //     //cannot request all
                // }
                // else if(role.roleType === RoleType.admin){}

                // else if(role.roleType === RoleType.employee){}

            }

            
        return build({detectSubjectType: (item)=> item.constructor as unknown as ExtractSubjectType<Subjects>,
        });
    }
}
