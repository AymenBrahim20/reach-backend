/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
import { IntProduct } from "src/product/interfaces/product.interface";

interface ProductOrder  {
    product: IntProduct,
    quantity: number
  }





export interface IntOrder extends Document{
  
    userId:string,
    totalPrice: number,
    products: ProductOrder[],
    address:object,
    status:string,
}