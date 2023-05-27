/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put,Patch, Res,UploadedFiles,UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import{diskStorage} from 'multer';
import { Role } from 'src/auth/role.enum';
/* import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiReponseEntity } from './dto/api.reponse'; */
import { request } from 'http';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
  
  async createUSer(@Res() response, @Body() CreateUserDto: CreateUserDto,@UploadedFiles() files) {
    try {
      CreateUserDto.files = files.map(item =>item.filename);
      const newUser = await this.userService.createUser(CreateUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        status: HttpStatus.OK,
        data: newUser
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: User not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 


  async updateuser(@Res() response, @Param('id') UserId: string, @Body() UpdateUserDto: UpdateUserDto, @UploadedFiles()  files) {
    try {
      if(files==undefined){

      const existinguser = await this.userService.updateUser(UserId, UpdateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data: existinguser,
        status: HttpStatus.OK
      });
      
    }  else {
      UpdateUserDto.files = files.map(item =>item.filename);

      const existinguser = await this.userService.updateUser(UserId, UpdateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data: existinguser,
        status: HttpStatus.OK
      });
  }
      }catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Patch(':id/seller')

  async changeRoleToSeller(@Res() response, @Param('id') userId: string, @Body() UpdateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateRoleToSeller(userId);
    return response.status(HttpStatus.OK).json({
      message: 'User has been successfully updated to Seller',
      data: updatedUser,
      status: HttpStatus.OK
    });
  }

  @Patch(':id/admin')

  async changeRoleToAdmin(@Res() response,@Param('id') userId: string, @Body() UpdateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateRoleToAdmin(userId);
    return response.status(HttpStatus.OK).json({
      message: 'User has been successfully updated to Admin',
      data: updatedUser,
      status: HttpStatus.OK
    });
  }



  @Get('/username')

  async CategoryByusername(@Res() response, @Query('username') username: string) {
    try {
      const existingUserByName = await
        this.userService.getUserByUsername(username);
      return response.status(HttpStatus.OK).json({
        message: 'user found successfully by name',
        data: existingUserByName,
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

  /* @Get('/isseller')

  async userbyseller(@Res() response, @Query('isseller') isSeller: boolean) {
    try {
      const existingUserBySeller = await this.userService.getUserBySeller(isSeller);
      return response.status(HttpStatus.OK).json({
        message: 'user found successfully by seller status',
        data: existingUserBySeller,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  } */

  @Get('/stats')

  async getuserStats(@Res() response) {
    try {
      const userstats = await
        this.userService.getUserStats();
      return response.status(HttpStatus.OK).json({
        message: 'user  stats found successfully ',
        data: userstats,
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

  async userByemail(@Res() response, @Query('email') email: string) {
    try {
      const existingUserByEmail = await
        this.userService.getUserByEmail(email);
      return response.status(HttpStatus.OK).json({
        message: 'user found successfully by email',
        data: existingUserByEmail,
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
  async getusers(@Res() response) {
    try {
      const UserData = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found successfully', status: HttpStatus.OK, data: UserData,
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

  async getuser(@Res() response, @Param('id') UserId: string) {
    try {
      const existingUser = await
        this.userService.getUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        data: existingUser,
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

  async deleteuser(@Res() response, @Param('id') UserId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
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