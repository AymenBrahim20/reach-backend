/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface Intmessage extends Document {
  readonly conversationId: string;
  readonly userId: string;
  readonly message: string;
  

}
