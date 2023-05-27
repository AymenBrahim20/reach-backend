import { Document } from "mongoose";
export interface IntSeller extends Document{

    readonly username:string;
    readonly businessname:string;
    readonly description:string;
    readonly files:string[]; 

    readonly firstname:string;

    readonly lastname:string;

    readonly email:string;
    readonly password:string;
    readonly phone:string;
    readonly address:string;

    
}