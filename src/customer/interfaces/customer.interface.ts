import { Document } from "mongoose";
export interface IntCustomer extends Document{

    readonly username:string;
    readonly firstname:string;

    readonly lastname:string;

    readonly email:string;
    readonly password:string;
    readonly phone:string;
    readonly address:string;

    
}