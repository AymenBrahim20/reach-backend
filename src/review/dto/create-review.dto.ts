/* eslint-disable prettier/prettier */


import { IsNotEmpty,IsNumber,IsString } from "class-validator";








export class CreateReviewDto {

    @IsString()
    @IsNotEmpty()
    readonly productId:string;

    @IsString()
    @IsNotEmpty()
    readonly userId:string;

    @IsNumber()
    @IsNotEmpty()
    readonly star:number;

    @IsString()
    @IsNotEmpty()
    readonly desc:string;
}


