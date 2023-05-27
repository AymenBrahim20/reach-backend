/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document } from "mongoose"
import * as argon2 from "argon2"

import { Role } from "src/auth/role.enum";

@Schema({timestamps:true})


export class UserEntity   extends Document {
        @Prop({required:true , unique:true})
            username:string;

            @Prop({required:true , unique:true})
            email:string;

           

            @Prop({required:true })
            password:string;

            @Prop({})
            files:string[];  

            @Prop({ })
            country:string;

            @Prop({})
            phone:string;

            @Prop({ })
            descr:string;

            

            @Prop({})
            refreshtoken:string;

            @Prop()
            roles: Role[];

}

export const UserSchema = SchemaFactory.createForClass(UserEntity).pre("save",async function() {
    this.password=await argon2.hash(this.password) });