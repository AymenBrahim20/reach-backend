/* eslint-disable prettier/prettier */




import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document,SchemaTypes,Types } from "mongoose";


@Schema({timestamps:true})

export class SubcategoryEntity {
  
        
            @Prop({required:true,unique:true})
            name:string;

          /*   @Prop({required:true})
            description:string; */

            
           @Prop({type:SchemaTypes.ObjectId,ref:'categories',required:true})
           category!:Types.ObjectId


           @Prop([{type:SchemaTypes.ObjectId,ref:'product',required:true}])
           product!:Types.ObjectId[]

           @Prop({required:true})
           files:string[];  

         }


 export const SubCategorySchema = SchemaFactory.createForClass(SubcategoryEntity);
