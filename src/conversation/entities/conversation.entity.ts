
/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document,SchemaTypes,Types } from "mongoose";


@Schema({timestamps:true})

export class ConversationEntity {
        
            
            @Prop({required:true,unique:true})
            id:string;

            @Prop({required:true})
            sellerId:string;

            @Prop({required:true})
            buyerId:string;

            @Prop({required:true})
            readBySeller:boolean;

            @Prop({required:true})
            readByBuyer:boolean;

            @Prop({required:false})
            lastMessage:string;
         
         }


 export const ConversationSchema = SchemaFactory.createForClass(ConversationEntity);
