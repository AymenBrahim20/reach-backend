/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  
  
  async createCustomer(@Res() response, @Body() CreateCustomerDto: CreateCustomerDto) {
    try {

      const newCustomer = await this.customerService.createCustomer(CreateCustomerDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Customer has been created successfully',
        status: HttpStatus.OK,
        data: newCustomer
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Customer not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')

  async updatecustomer(@Res() response, @Param('id') CustomerId: string, @Body() UpdateCustomerDto: UpdateCustomerDto) {
    try {
      const existingcustomer = await this.customerService.updateCustomer(CustomerId, UpdateCustomerDto);
      return response.status(HttpStatus.OK).json({
        message: 'Customer has been successfully updated',
        data: existingcustomer,
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

  async getCustomerByUserName(@Res() response, @Query('username') username: string) {
    try {
      const existingCustomerrByName = await
        this.customerService.getCustomerByUsername(username);
      return response.status(HttpStatus.OK).json({
        message: 'customer found successfully by name',
        data: existingCustomerrByName,
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

  async getcustomerByemail(@Res() response, @Query('email') email: string) {
    try {
      const existingCustomerByEmail = await
        this.customerService.getCustomerByEmail(email);
      return response.status(HttpStatus.OK).json({
        message: 'customer found successfully by email',
        data: existingCustomerByEmail,
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
  async getcustomers(@Res() response) {
    try {
      const CustomerData = await this.customerService.getAllCustomers();
      return response.status(HttpStatus.OK).json({
        message: 'All Customers data found successfully', status: HttpStatus.OK, data: CustomerData,
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

  async getcustomer(@Res() response, @Param('id') CustomerId: string) {
    try {
      const existingCustomer = await
        this.customerService.getCustomer(CustomerId);
      return response.status(HttpStatus.OK).json({
        message: 'Customer found successfully',
        data: existingCustomer,
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

  async deletecustomer(@Res() response, @Param('id') CustomerId: string) {
    try {
      const deletedUser = await this.customerService.deleteCustomer(CustomerId);
      return response.status(HttpStatus.OK).json({
        message: 'Customer deleted successfully',
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
