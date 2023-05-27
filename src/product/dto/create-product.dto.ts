/* eslint-disable prettier/prettier */
 
import { IsNotEmpty,IsNumber,IsString, IsEmpty } from "class-validator";
import { UserEntity } from "src/user/entities/user.entity";






export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @IsNotEmpty()
    readonly description:string;
     
    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: UserEntity;
 
          


    @IsString()
    @IsNotEmpty()
    readonly price:string;

    @IsString()
    @IsNotEmpty()
    readonly longDesc:string;

    @IsNumber()
    @IsNotEmpty()
    readonly totalStars:number;

    @IsNumber()
    @IsNotEmpty()
    readonly starNumber:number;

    @IsString()
    @IsNotEmpty()
    readonly features:string[];

    @IsNumber()
    @IsNotEmpty()
    readonly sales:number;

    @IsString()
    @IsNotEmpty()
    readonly quantity:string;

    @IsString()
    
    readonly isnew:boolean;

    @IsString()
    
    readonly oldprice:string;

    @IsString()
    @IsNotEmpty()
    files:string[]; 

    @IsString()
    @IsNotEmpty()
    readonly subcategories:string;

}
