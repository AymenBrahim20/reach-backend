/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { IntCustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('customer') private CustomerModel: Model<IntCustomer>) { }
 
 
 
 
 

async createCustomer(CreateCustomerDto:CreateCustomerDto):Promise <IntCustomer> {
  const newCustomer= await new this.CustomerModel(CreateCustomerDto)
  return newCustomer.save();
}









  async updateCustomer(CustomerId: string, UpdateCustomerDto: UpdateCustomerDto): Promise<IntCustomer> {
    const existingcustomer  = await this.CustomerModel.findByIdAndUpdate(CustomerId, UpdateCustomerDto, { new: true });
    if (!existingcustomer) {
      throw new NotFoundException(`customer  #${CustomerId} not found`);
    }
    return existingcustomer;
  }



  async getAllCustomers(): Promise<IntCustomer[]> {
    const CustomerData = await this.CustomerModel.find().select("-__v");
    if (!CustomerData || CustomerData.length == 0) {
      throw new NotFoundException('Customer data not found!');
    }
    return CustomerData;
  }
  async getCustomer(CustomerId :string): Promise<IntCustomer> {
    const existingcustomer = await this.CustomerModel.findById(CustomerId).exec();
    if (!existingcustomer) {
      throw new NotFoundException(`Customer #${CustomerId} not found`);
    }
    return existingcustomer;
  }

  async getCustomerByUsername(username: string): Promise<IntCustomer> {
    return this.CustomerModel.findOne({ username }).exec();
  }

  



  async getCustomerByEmail(email: string): Promise<IntCustomer> {
    const existingCustomerByEmail = await this.CustomerModel.findOne({email:email}).exec();
    if (!existingCustomerByEmail) {
      throw new NotFoundException(`Customer #${email} not found`);
    }
    return existingCustomerByEmail;
  }
  async deleteCustomer(CustomerId: string): Promise<IntCustomer> {
    const deletedCustomer = await this.CustomerModel.findByIdAndDelete(CustomerId);
    if (!deletedCustomer) {
      throw new NotFoundException(`Customer #${CustomerId} not found`);
    }
    return deletedCustomer;
  }


  
}
