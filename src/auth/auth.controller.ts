/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body,Req,HttpStatus,Res, Patch, Param, Delete ,UseGuards,UploadedFiles,UseInterceptors} from '@nestjs/common';
import { Request, response } from 'express';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import{diskStorage} from 'multer';


@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}


   @Post('/signup')
   @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 
   async signup( @Res() response, @Body() CreateUserDto:CreateUserDto,@UploadedFiles() files) {
try {
      CreateUserDto.files = files.map(item =>item.filename);

      const newSignup = await this.authService.signUp(CreateUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Sign up is successfull',
        status: HttpStatus.OK,
        data: newSignup
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Sign up is not successfull!' + err,
        data: null
      });


   }
   
  }


   @Post('/signin')
   signIn(@Body() data:CreateLoginDto) {
 
    return this.authService.signIn(data);


   }
  


   @UseGuards(AccessTokenGuard)
 
  @Get('logout')

  logout(@Req() req:Request) {
 
    return this.authService.logout(req.user['sub']);


   }
 

   @UseGuards(RefreshTokenGuard)
 
  @Get('refresh')
    refreshTokens(@Req() req:Request) {
        const userId=req.user['sub'];
        const refreshToken =req.user['refreshToken'];
        return this.authService.refreshTokens(userId,refreshToken)

    }




    

}

  

