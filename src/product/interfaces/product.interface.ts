/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { UserEntity } from 'src/user/entities/user.entity';
export interface IntProduct extends Document {
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly isnew: boolean;
  readonly oldprice: string;
  readonly sales: number;
  readonly totalStars: number;
  readonly starNumber: number;
  readonly longDesc: string;
  readonly features: string[];
  readonly user:UserEntity

  readonly quantity: string;
  readonly files: string[];

  readonly subcategories: string;
}
