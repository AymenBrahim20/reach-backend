/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

interface Product{
    productId: string;
    quantity: number;

}

export interface IntCart extends Document {
  readonly userId: string;
  readonly products: Product[];
}
