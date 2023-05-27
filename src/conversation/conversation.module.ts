/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationSchema } from './entities/conversation.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'conversation',schema:ConversationSchema}]),
],
  controllers: [ConversationController],
  providers: [ConversationService]
})
export class ConversationModule {}
