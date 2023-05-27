import { Document } from 'mongoose';

export interface IntCategory extends Document {
  readonly name: string;
  readonly description: string;
  /*  readonly file:string; */
  readonly files: string[];
}
