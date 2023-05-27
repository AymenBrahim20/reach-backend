/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document,SchemaTypes,Types } from "mongoose"
import { UserEntity } from "src/user/entities/user.entity";


@Schema({timestamps:true})


export class CustomerEntity  extends UserEntity {
       

            @Prop({required:true })
            firstname:string;
            @Prop({required:true  })
            lastname:string;

           
            @Prop({required:true })
            phone:string;

            @Prop({required:true })
            address:string;

           
            





}

export  const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);
