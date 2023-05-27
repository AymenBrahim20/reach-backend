/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document,SchemaTypes,Types } from "mongoose";


@Schema({timestamps:true})

export class CartEntity {
        
    @Prop({ required: true })
    userId: string;
  
    @Prop([
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ])
    products: {
      productId: string;
      quantity: number;
    }[];

           
         }


 export const CartSchema = SchemaFactory.createForClass(CartEntity);
