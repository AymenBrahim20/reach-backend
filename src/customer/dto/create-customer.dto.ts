




 
import { IsNotEmpty,IsNumber,IsString } from "class-validator";

    




export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    readonly username:string;
    @IsString()
    @IsNotEmpty()
    readonly firstname:string;
    @IsString()
    @IsNotEmpty()
    readonly lastname:string;

    @IsString()
    @IsNotEmpty()
    readonly email:string;
    
   
    
    @IsString()
    @IsNotEmpty()
    readonly password:string;
    
    
    @IsString()
    @IsNotEmpty()
    readonly address:string;
    


    @IsString()
    @IsNotEmpty()
    readonly phone:string;

    

    

}
