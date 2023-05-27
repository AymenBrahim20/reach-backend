/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsNumber,IsString } from "class-validator";



export class CreateOrderDto {
    


    @IsString()
    @IsNotEmpty()
    readonly totalPrice:number;

    @IsString()
    @IsNotEmpty()
    readonly product:string;

    @IsString()
    @IsNotEmpty()
    readonly quantity:number;
}


