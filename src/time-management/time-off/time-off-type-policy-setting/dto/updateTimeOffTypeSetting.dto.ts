import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator"

class timeOffTypePolicySetting{

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    _id:string

    // not include timeOffPolicy so it can't be updated
    // @IsNotEmpty()
    // @IsString()
    // @IsMongoId()
    // timeOffPolicy:string

    @ValidateIf((object,value) => value !== null )
    @IsNotEmpty()
    @IsNumber()
    duration:number

    @IsNotEmpty()
    @IsBoolean()
    includeDayOff:boolean

    @IsNotEmpty()
    @IsBoolean()
    allowHalfDay:boolean

    @IsNotEmpty()
    @IsBoolean()
    setScheduleHalfDay:boolean

    @IsNotEmpty()
    @IsBoolean()
    setDefault:boolean

    @IsNotEmpty()
    @IsBoolean()
    emergeAtJoin:boolean

    @IsNotEmpty()
    @IsBoolean()
    show:boolean
    
    @ValidateIf((object,value) => value !== null )
    @IsNotEmpty()
    @IsNumber()
    maxRequest:number

    @IsNotEmpty()
    @IsBoolean()
    allowMinus:boolean

    @ValidateIf((object,value) => value !== null )
    @IsNotEmpty()
    @IsNumber()
    minusAmount:number
    
    @IsNotEmpty()
    @IsBoolean()
    carryForward:boolean

    @ValidateIf((object,value) => value !== null )
    @IsNotEmpty()
    @IsNumber()
    carryAmount:number

    @ValidateIf((object,value) => value !== null )
    @IsNotEmpty()
    @IsNumber()
    carryExpired:number

    @IsNotEmpty()
    @IsBoolean()
    timeOffCompensation:boolean

    @IsNotEmpty()
    @IsBoolean()
    attachmentMandatory:boolean
}
export class updateTimeOffTypeSettingDto{
    @ValidateNested({each:true})
    @Type(()=> timeOffTypePolicySetting)
    @IsNotEmpty()
    @IsArray()
    timeOffTypePolicySettings: timeOffTypePolicySetting[]
}