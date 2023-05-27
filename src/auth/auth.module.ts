/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';
import { AccessTokenStrategy } from './strategy/accesstoken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshtoken.strategy';
import { UserService } from 'src/user/user.service';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerModule } from 'src/customer/customer.module';
import { CustomerSchema } from 'src/customer/entities/customer.entity';

@Module({
  imports:[UserModule,CustomerModule,JwtModule.register({}),MongooseModule.forFeature([{name:'user',schema:UserSchema},{name:'customer',schema:CustomerSchema}])
    
],
  controllers: [AuthController],
  providers: [AuthService,CustomerService,UserService,RefreshTokenStrategy,AccessTokenStrategy]
})
export class AuthModule {}
