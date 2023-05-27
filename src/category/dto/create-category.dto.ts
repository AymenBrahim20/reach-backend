 
import { IsNotEmpty,IsNumber,IsString } from "class-validator";






export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @IsNotEmpty()
    readonly description:string;

  /*    @IsString()
    @IsNotEmpty()
    file:string; 
 */
    @IsString()
    @IsNotEmpty()
    files:string[]; 

}
