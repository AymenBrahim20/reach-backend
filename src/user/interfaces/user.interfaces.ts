/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
import { Role } from "src/auth/role.enum";

export interface IntUser extends Document{
    
readonly username:string;
readonly email:string;
readonly password:string;
readonly files:string[];
 roles: Role[]
readonly refreshtoken:string;
readonly country:string;
readonly phone:string;

readonly desc:string;



}

 