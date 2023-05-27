/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema } from './entities/cart.entity';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports:[MongooseModule.forFeature([{name:'cart',schema:CartSchema}]),
],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
