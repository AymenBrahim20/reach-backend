/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './entities/review.entity';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:'review',schema:ReviewSchema}]),
],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
