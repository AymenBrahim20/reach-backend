/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { IntCart } from './interfaces/cart.interface';
@Injectable()
export class CartService {
  constructor(@InjectModel('cart') private CartModel: Model<IntCart>) { }
  async createCart(CreateCartDto: CreateCartDto): Promise<IntCart> {
    const newCart = await new this.CartModel(CreateCartDto);
    return newCart.save();
  }
  async updateCart(CartId: string, UpdateCartDto: UpdateCartDto): Promise<IntCart> {
    const existingCart = await this.CartModel.findByIdAndUpdate(CartId, UpdateCartDto, { new: true });
    if (!existingCart) {
      throw new NotFoundException(`Cart #${CartId} not found`);
    }
    return existingCart;
  }
  async getAllCarts(): Promise<IntCart[]> {
    const UserData = await this.CartModel.find().select("-__v");
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('Cart data not found!');
    }
    return UserData;
  }
  async getCart(CartId: string): Promise<IntCart> {
    const existingCart = await this.CartModel.findById(CartId).exec();
    if (!existingCart) {
      throw new NotFoundException(`Cart #${CartId} not found`);
    }
    return existingCart;
  }





  
  async deleteCart(CartId: string): Promise<IntCart> {
    const deletedCart = await this.CartModel.findByIdAndDelete(CartId);
    if (!deletedCart) {
      throw new NotFoundException(`User #${CartId} not found`);
    }
    return deletedCart;
  }
}