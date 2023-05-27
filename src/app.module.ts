/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './category/category.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', { dbName: 'Pfebase' }),
    CategoriesModule,
    SubcategoriesModule,
    UserModule,
    AuthModule,
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    SellerModule,
    OrderModule,
    ReviewModule,
    ConversationModule,
    MessageModule,
    CartModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
