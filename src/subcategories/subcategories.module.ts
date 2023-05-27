import { Module } from '@nestjs/common';
import { SubCategoriesService } from './subcategories.service';
import { SubCategoriesController } from './subcategories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategorySchema } from './entities/subcategory.entity';
import { CategorySchema } from 'src/category/entities/category.entity';


@Module({
  imports:[MongooseModule.forFeature([{name:'subcategories',schema:SubCategorySchema},{name:'categories',schema:CategorySchema}]),
],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService]
})
export class SubcategoriesModule {}
