/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Document, SchemaTypes } from 'mongoose';
@Schema({ timestamps: true })
export class OrderEntity {
@Prop({ unique: true })
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId;
        ref: 'product';
      };
      quantity: {
        type: number;
        default: 1;
      };
    },
  ];

  @Prop({  })
  userId: string;

  @Prop({})
  address: string;

  @Prop({ required: true })
  totalPrice: number;
  @Prop({ required: true, default: "pending" })
  status: string;
  
}
export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
