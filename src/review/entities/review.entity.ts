/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document,SchemaTypes,Types } from "mongoose";


@Schema({timestamps:true})

export class ReviewEntity {
        
            @Prop({required:true})
            productId:string;

            
            @Prop({required:true})
            userId:string;

            @Prop({required:true, enum:[1,2,3,4,5]})
            star:number;


            

            @Prop({required:true})
            desc:string;

        
         }


 export const ReviewSchema = SchemaFactory.createForClass(ReviewEntity);
