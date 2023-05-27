/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable,NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { IntOrder } from './interfaces/order.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel('order') private readonly OrderModel: Model < IntOrder > ) {}

  async createOrder(CreateOrderDto: CreateOrderDto): Promise < IntOrder > {
   
      const newOrder = await new this.OrderModel(CreateOrderDto);
      return newOrder.save();
    }


async updateOrder(OrderId: string, updateOrder: UpdateOrderDto): Promise<IntOrder> {
  const existingOrder= await this.OrderModel.findByIdAndUpdate(OrderId, updateOrder, { new: true });
  if (!existingOrder) {
    throw new NotFoundException(`Product #${OrderId} not found`);
  }
  return existingOrder;
}






async GetAllOrders(): Promise < IntOrder[] > {
  

    const OrdertData = await this.OrderModel.find().select("-__v");
    if (!OrdertData || OrdertData.length == 0) {
      throw new NotFoundException('Orders data not found!');
    }
    return OrdertData;
  }

  async getOrder(OrderId: string): Promise<IntOrder> {
    const existingOrder = await this.OrderModel.findById(OrderId).exec();
    if (!existingOrder) {
      throw new NotFoundException(`Order #${OrderId} not found`);
    }
    return existingOrder;
  }



  async deleteOrder(OrderId: string): Promise<IntOrder> {
    const deleteOrder = await this.OrderModel.findByIdAndDelete(OrderId);
    if (!deleteOrder) {
      throw new NotFoundException(`Order #${OrderId} not found`);
    }
    return deleteOrder;
  }

}