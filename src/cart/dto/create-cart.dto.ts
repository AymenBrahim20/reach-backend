/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString } from "class-validator";


export class CreateCartDto {
    
    @IsString()
    @IsNotEmpty()
    userId: string;

    
    products: {
      productId: string;
      quantity: number;
    }[];


}
