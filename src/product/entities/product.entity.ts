/* eslint-disable prettier/prettier */




import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import mongoose, { Document,SchemaTypes,Types } from "mongoose";
import { UserEntity } from "src/user/entities/user.entity";


@Schema({timestamps:true})

export class ProductEntity {
        

   


    


            @Prop({required:true,unique:true})
            name:string;

            @Prop({required:true})
            description:string;
            @Prop({required:true})
            price:string;
            @Prop({required:true})
            longDesc:string;
             
            @Prop({required:true,unique:true})
            quantity:string;
            @Prop({required:false})
            features:string[]; 
            
            @Prop({})
            isnew:boolean;

            @Prop({})
            oldprice:string;

            @Prop({default:0})
            totalStars:number;
            @Prop({default:0})
            starNumber:number;

            @Prop({default:0})
            sales:number;

           @Prop({})
           size:string;
           @Prop({})
           color:string;

           @Prop({})
           style:string;

           @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
           user: UserEntity;
    
           @Prop({required:true})
            files:string[];  
          

            
           @Prop({type:SchemaTypes.ObjectId,ref:'subcategories',required:true})
           subcategories!:Types.ObjectId


           

          


         }


 export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
