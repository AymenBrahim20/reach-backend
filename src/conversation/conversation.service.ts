/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { IntConversation } from './interfaces/conversation.interface';

@Injectable()
export class ConversationService {
  constructor(@InjectModel('conversation') private ConversationModel: Model<IntConversation>) { }
  async createConversation(CreateConversationDto: CreateConversationDto): Promise<IntConversation> {
    const newConversation = await new this.ConversationModel(CreateConversationDto);
    return newConversation.save();
  }


  








}
