import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, Length, ValidateNested } from "class-validator";
import { MasterMenu } from "src/master-table/model";
import { roleTypes } from "../enum";


class filterEmployee{

    @IsString({each: true})
    @IsNotEmpty({each: true})
    organization:String[];

    @IsString({each: true})
    @IsNotEmpty({each: true})
    jobLevel!:String[];
}



class menuAccess{

    @IsString()
    @IsNotEmpty()
    menu: MasterMenu;

    @IsBoolean()
    view: boolean;

    @IsBoolean()
    add: boolean;

    @IsBoolean()
    edit: boolean;

    @IsBoolean()
    delete: boolean;

    @IsBoolean()
    request: boolean;

    @IsBoolean()
    wholeCompany: boolean;
 
}


export class AccessDto{

    @IsString()
    @IsNotEmpty()
    @Length(5, 24)
    roleName: string;

    @IsEnum(roleTypes)
    roleType: string;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested({each: true})
    @Type(() => filterEmployee)
    filterEmployee: filterEmployee[];

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => menuAccess)
    menuAccess: menuAccess[];

}