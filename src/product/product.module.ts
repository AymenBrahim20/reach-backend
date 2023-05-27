import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { CategorySchema } from 'src/category/entities/category.entity';
import { SubCategorySchema } from 'src/subcategories/entities/subcategory.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'product', schema: ProductSchema },
      { name: 'subcategories', schema: SubCategorySchema },
      { name: 'categories', schema: CategorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
