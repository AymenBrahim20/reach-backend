import { IsNotEmpty,IsNumber,IsString } from "class-validator";

export class CreateSellerDto {

    @IsString()
    @IsNotEmpty()
    readonly username:string;


    @IsString()
    @IsNotEmpty()
    readonly businessname:string;

    readonly description:string;
    files:string[]; 


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








 

    




