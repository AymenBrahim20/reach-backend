/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document,SchemaTypes,Types } from "mongoose";


@Schema({timestamps:true})

export class CategoryEntity {
        
            @Prop({required:true,unique:true})
            name:string;

            @Prop({required:true})
            description:string;

            @Prop([{type:SchemaTypes.ObjectId,ref:'subcategories',required:true}])
           subcategories!:Types.ObjectId[]
           
         /*   @Prop({required:true})
           file:string;  */

            @Prop({required:true})
           files:string[];  
         }


 export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
