/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { IntSeller } from './interfaces/seller.interface';


@Injectable()
export class SellerService {
  constructor(@InjectModel('seller') private SellerModel: Model<IntSeller>) { }
 
 
 
 
 

async createSeller(CreateSellerDto:CreateSellerDto):Promise <IntSeller> {
  const newSeller= await new this.SellerModel(CreateSellerDto)
  return newSeller.save();
}









  async updateSeller(SellerId: string, UpdateSellerDto: UpdateSellerDto): Promise<IntSeller> {
    const existingseller  = await this.SellerModel.findByIdAndUpdate(SellerId, UpdateSellerDto, { new: true });
    if (!existingseller) {
      throw new NotFoundException(`Seller  #${SellerId} not found`);
    }
    return existingseller;
  }



  async getAllSellers(): Promise<IntSeller[]> {
    const SellerData = await this.SellerModel.find().select("-__v");
    if (!SellerData || SellerData.length == 0) {
      throw new NotFoundException('Seller data not found!');
    }
    return SellerData;
  }
  async getSeller(SellerId :string): Promise<IntSeller> {
    const existingseller = await this.SellerModel.findById(SellerId).exec();
    if (!existingseller) {
      throw new NotFoundException(`Seller #${SellerId} not found`);
    }
    return existingseller;
  }

  async getSellerByUsername(username: string): Promise<IntSeller> {
    return this.SellerModel.findOne({ username }).exec();
  }

  



  async getSellerByEmail(email: string): Promise<IntSeller> {
    const existingsellerByEmail = await this.SellerModel.findOne({email:email}).exec();
    if (!existingsellerByEmail) {
      throw new NotFoundException(`Seller #${email} not found`);
    }
    return existingsellerByEmail;
  }
  async deleteSeller(SellerId: string): Promise<IntSeller> {
    const deletedSeller = await this.SellerModel.findByIdAndDelete(SellerId);
    if (!deletedSeller) {
      throw new NotFoundException(`Seller #${SellerId} not found`);
    }
    return deletedSeller;
  }
}
