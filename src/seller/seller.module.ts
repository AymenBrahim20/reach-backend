import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from './entities/seller.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'seller',schema:SellerSchema}]),
],
  controllers: [SellerController],
  providers: [SellerService]
})
export class SellerModule {}
