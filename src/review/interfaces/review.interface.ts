import { Document } from 'mongoose';

export interface IntReview extends Document {
  readonly productId: string;
  readonly userId: string;
  readonly desc: string;
  readonly star: number;

}
