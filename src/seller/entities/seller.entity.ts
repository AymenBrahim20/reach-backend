/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document,SchemaTypes,Types } from "mongoose"
import { UserEntity } from "src/user/entities/user.entity";


@Schema({timestamps:true})


export class SellerEntity  extends UserEntity {
       
    @Prop({required:true  })
    businessname:string;

            @Prop({required:true })
            firstname:string;
            @Prop({required:true  })
            lastname:string;
            
            @Prop()
            description:string;
           
            @Prop({required:true })
            phone:string;

            @Prop({required:true })
            address:string;

           
            
         
            @Prop()
           files:string[]; 




}

export  const SellerSchema = SchemaFactory.createForClass(SellerEntity);
