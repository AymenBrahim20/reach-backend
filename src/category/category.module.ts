/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './entities/category.entity';
import { CategoriesController } from './category.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:'categories',schema:CategorySchema}]),
],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
