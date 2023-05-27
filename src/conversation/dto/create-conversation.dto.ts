/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty,IsString } from "class-validator";


export class CreateConversationDto {

    @IsString()
    @IsNotEmpty()
    readonly id:string;

    @IsString()
    @IsNotEmpty()
    readonly sellerId:string;

    @IsString()
    @IsNotEmpty()
    readonly buyerId:string;


    @IsBoolean()
    @IsNotEmpty()
    readonly readBySeller:boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly readByBuyer:boolean;


    @IsString()
    @IsNotEmpty()
    readonly lastMessage:string;


}
