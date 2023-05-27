/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';


@Module({

  imports:[MongooseModule.forFeature([{name:'user',schema:UserSchema}]),
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
