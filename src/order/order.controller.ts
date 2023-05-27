/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put, Res} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createorder(@Res() response, @Body() CreateOrderDto: CreateOrderDto) {
    try {

      const newOrder = await this.orderService.createOrder(CreateOrderDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Order has been created successfully',
        status: HttpStatus.OK,
        data: newOrder
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Order not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  async updateorder(@Res() response, @Param('id')OrderId: string, @Body() updateorder: UpdateOrderDto) {
    try {
      const existingOrder = await this.orderService.updateOrder(OrderId, updateorder);
      return response.status(HttpStatus.OK).json({
        message: 'Order has been successfully updated',
        data: existingOrder,
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
    async getallorders(@Res() response) {
      try {
        const OrderData = await this.orderService.GetAllOrders();
        return response.status(HttpStatus.OK).json({
          message: 'All Orders data found successfully', status: HttpStatus.OK, data: OrderData,
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
    async getorderById(@Res() response, @Param('id') OrderId: string) {
      try {
        const existingOrder = await
          this.orderService.getOrder(OrderId);
        return response.status(HttpStatus.OK).json({
          message: 'Order found successfully',
          data: existingOrder,
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
    async deleteorder(@Res() response, @Param('id') OrderId: string) {
      try {
        const deletedOrder = await this.orderService.deleteOrder(OrderId);
        return response.status(HttpStatus.OK).json({
          message: 'Order deleted successfully',
          status: HttpStatus.OK,
          data: deletedOrder,
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
