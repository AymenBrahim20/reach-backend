/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/order.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: 'order', schema: OrderSchema}])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
