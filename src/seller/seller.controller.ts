/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put, Res,UploadedFiles,UseInterceptors } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

import{diskStorage} from 'multer';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 
  
  async createSeller(@Res() response, @Body() CreateSellerDto: CreateSellerDto , @UploadedFiles() files) {
    try {
      CreateSellerDto.files = files.map(item =>item.filename);

      const newSeller = await this.sellerService.createSeller(CreateSellerDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Seller has been created successfully',
        status: HttpStatus.OK,
        data: newSeller
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Seller not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')

  async updatecustomer(@Res() response, @Param('id') SellerId: string, @Body() UpdateSellerDto: UpdateSellerDto) {
    try {
      const existingseller = await this.sellerService.updateSeller(SellerId, UpdateSellerDto);
      return response.status(HttpStatus.OK).json({
        message: 'Seller has been successfully updated',
        data: existingseller,
        status: HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Get('/username')

  async getSellerByUserName(@Res() response, @Query('username') username: string) {
    try {
      const existingsellerrByName = await
        this.sellerService.getSellerByUsername(username);
      return response.status(HttpStatus.OK).json({
        message: 'Seller found successfully by name',
        data: existingsellerrByName,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }






  @Get('/email')

  async getsellerByemail(@Res() response, @Query('email') email: string) {
    try {
      const existingsellerByEmail = await
        this.sellerService.getSellerByEmail(email);
      return response.status(HttpStatus.OK).json({
        message: 'Seller found successfully by email',
        data: existingsellerByEmail,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }



  @Get()
  async getsellers(@Res() response) {
    try {
      const CustomerData = await this.sellerService.getAllSellers();
      return response.status(HttpStatus.OK).json({
        message: 'All Seller data found successfully', status: HttpStatus.OK, data: CustomerData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  @Get('/:id')
 /*  @ApiParam({
    email: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.'
  }) */

  async getseller(@Res() response, @Param('id') SellerId: string) {
    try {
      const existingseller = await
        this.sellerService.getSeller(SellerId);
      return response.status(HttpStatus.OK).json({
        message: 'Seller found successfully',
        data: existingseller,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  

  @Delete('/:id')

  async deleteseller(@Res() response, @Param('id') SellerId: string) {
    try {
      const deletedUser = await this.sellerService.deleteSeller(SellerId);
      return response.status(HttpStatus.OK).json({
        message: 'Seller deleted successfully',
        status: HttpStatus.OK,
        data: deletedUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  
}
