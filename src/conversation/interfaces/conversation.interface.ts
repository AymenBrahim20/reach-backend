/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface IntConversation extends Document {
  readonly id: string;
  readonly sellerId: string;
  readonly buyerId: string;
  readonly readBySeller: boolean;
  readonly readByBuyer: boolean;
  readonly lastMessage: string;

}
