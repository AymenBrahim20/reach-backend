/* eslint-disable prettier/prettier */


 
import {  IsNotEmpty,IsString } from "class-validator";






export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username:string;

    @IsString()
    @IsNotEmpty()
    readonly email:string;

    
    
    @IsString()
    @IsNotEmpty()
    readonly password:string;

    @IsString()
    files:string[]; 
   
    readonly country:string;

    
    readonly desc:string;

    readonly phone:string;
    roles: string[];
    
      readonly refreshtoken:string;
    


    

    

}
