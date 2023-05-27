/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document,SchemaTypes,Types } from "mongoose";


@Schema({timestamps:true})

export class MessageEntity {
        
            
            @Prop({required:true})
            conversationId:string;

            @Prop({required:true})
            userId:string;

            @Prop({required:true})
            message:string;

         
         }


 export const MessageSchema = SchemaFactory.createForClass(MessageEntity);
