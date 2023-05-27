/* eslint-disable prettier/prettier */


import { IsNotEmpty,IsString } from "class-validator";



export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    readonly conversationId:string;

    @IsString()
    @IsNotEmpty()
    readonly userId:string;

    @IsString()
    @IsNotEmpty()
    readonly message:string;
}
