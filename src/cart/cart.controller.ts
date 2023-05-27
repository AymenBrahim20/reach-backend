/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
 
  async createcart(@Res() response, @Body() CreateCartDto: CreateCartDto , ) {
    try {

      const newCart = await this.cartService.createCart(CreateCartDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Cart has been created successfully',
        status: HttpStatus.OK,
        data: newCart
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: cart not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')

  async updatecart(@Res() response, @Param('id') CartId: string, @Body() UpdateCartDto: UpdateCartDto) {
    try {
      const existingcart = await this.cartService.updateCart(CartId, UpdateCartDto);
      return response.status(HttpStatus.OK).json({
        message: 'Cart has been successfully updated',
        data: existingcart,
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

  






  



  @Get()
  async getcarts(@Res() response) {
    try {
      const CartsData = await this.cartService.getAllCarts();
      return response.status(HttpStatus.OK).json({
        message: 'All Carts data found successfully', status: HttpStatus.OK, data: CartsData,
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

  async getcart(@Res() response, @Param('id') CartId: string) {
    try {
      const existingcart = await
        this.cartService.getCart(CartId);
      return response.status(HttpStatus.OK).json({
        message: 'cart found successfully',
        data: existingcart,
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

  async deletecart(@Res() response, @Param('id') CartId: string) {
    try {
      const deletedUser = await this.cartService.deleteCart(CartId);
      return response.status(HttpStatus.OK).json({
        message: 'cart deleted successfully',
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
