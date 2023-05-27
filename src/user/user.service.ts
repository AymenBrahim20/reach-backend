/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IntUser } from './interfaces/user.interfaces';
import { Role } from 'src/auth/role.enum';
@Injectable()
export class UserService {
  constructor(@InjectModel('user') private UserModel: Model<IntUser>) { }
  async createUser(CreateUserDto: CreateUserDto): Promise<IntUser> {
    const newUser = await new this.UserModel({
      ...CreateUserDto,
      roles:[CreateUserDto.roles || Role.Member]
    });
    return newUser.save();
  }
  async updateUser(UserId: string, UpdateUserDto: UpdateUserDto): Promise<IntUser> {
    const existinguser = await this.UserModel.findByIdAndUpdate(UserId, UpdateUserDto, { new: true });
    if (!existinguser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existinguser;
    
  }

  async updateRoleToSeller(userId: string): Promise<IntUser> {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.roles = [Role.Seller]; // Assign the new role as an array with only the "seller" role
    return user.save();
  }

  async updateRoleToAdmin(userId: string): Promise<IntUser> {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.roles = [Role.Admin]; // Assign the new role as an array with only the "seller" role
    return user.save();
  }

  async getAllUsers(): Promise<IntUser[]> {
    const UserData = await this.UserModel.find().select("-__v");
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return UserData;
  }
  async getUser(UserId: string): Promise<IntUser> {
    const existingUser = await this.UserModel.findById(UserId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existingUser;
  }

  async getUserByUsername(username: string): Promise<IntUser> {
    return this.UserModel.findOne({ username }).exec();
  }

  
 /*  async getUserBySeller(isSeller: boolean): Promise<IntUser> {
    return this.UserModel.findOne({ isSeller }).exec();
  } */


  async getUserStats(): Promise<any> {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await this.UserModel.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        },
      ]);
      return data;
    } catch (err) {
      throw new Error('Failed to fetch user statistics.');
    }
  }



  async getUserByEmail(email: string): Promise<IntUser> {
    const existingUserByEmail = await this.UserModel.findOne({email:email}).exec();
    if (!existingUserByEmail) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return existingUserByEmail;
  }
  async deleteUser(UserId: string): Promise<IntUser> {
    const deletedUser = await this.UserModel.findByIdAndDelete(UserId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return deletedUser;
  }
}