 
import { IsNotEmpty,IsNumber,IsString } from "class-validator";






export class CreateSubcategoryDto {
    @IsString()
    @IsNotEmpty()
    readonly name:string;

   /*  @IsString()
    @IsNotEmpty()
    readonly description:string; */

    @IsString()
    @IsNotEmpty()
    readonly category:string;
    @IsString()
    @IsNotEmpty()
    files:string[]; 

}
