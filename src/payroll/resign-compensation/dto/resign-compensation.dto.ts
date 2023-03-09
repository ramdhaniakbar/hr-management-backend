import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsString, ValidateIf, ValidateNested } from "class-validator";
import { pkwtTaxType } from "src/enum";

class payrollComponent{
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    allowance: string
}
export class resignCompensationDto{
    // salary dihardcode jadi ketika mengkalkulasi akan otomatis ditambahkan
    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => payrollComponent)
    @ValidateIf((object,value) => value !== null )
    components: payrollComponent[]

    @IsString()
    @IsNotEmpty()
    @IsEnum(pkwtTaxType)
    taxType: string
}