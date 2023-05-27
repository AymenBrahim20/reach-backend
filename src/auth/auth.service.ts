/* eslint-disable prettier/prettier */
import { Injectable, ForbiddenException,BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt';
import * as argon2 from "argon2"
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { CreateLoginDto } from './dto/create-login.dto';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(private usersService:UserService, private jwtService:JwtService, private configService: ConfigService) {}
  


 async signUp(createuserdto:CreateUserDto):Promise <any>{
      const userExists = await this.usersService.getUserByUsername(
        createuserdto.username,
      );
      if(userExists) {
        throw new BadRequestException ('User already exists')
      }
         
      const hash =  await this.hashData (createuserdto.password);
      const user= await this.usersService.createUser({
        ...createuserdto,
        password : hash,
      });
      const tokens = await this.getTokens (user._id,user.username);
      await this.upddateRefreshToken(user._id,tokens.refreshToken);
      return {tokens,user}

 }

 hashData(data:string){
  return argon2.hash(data);
}

 






 async signIn (data:CreateLoginDto){
  const user = await this.usersService.getUserByUsername(data.username);
  if(!user) throw new BadRequestException('user does not exist');

  
  const passwordMatches = await argon2.verify (user.password,data.password);

  if (!passwordMatches){
    console.log('Stored Password Hash:', user.password);
    console.log('Input Password Hash:', data.password);
    throw new BadRequestException ('Password is incorrect');

  }
  const tokens= await this.getTokensLogin (user._id,user.username,user.roles);
  await this .upddateRefreshToken (user._id,tokens.refreshToken);
  return {tokens ,user}
  

 }
 async getTokensLogin (userId:string,username:string,roles:Role[]) {
  const [accessToken , refreshToken] = await Promise.all([
    this.jwtService.signAsync(
  {
  sub:userId,
  username,
  roles,

  },
     {          secret:'abcd',
            expiresIn:'15m',
  },
   ),
     this.jwtService.signAsync(
    {
      sub:userId,
  username,
  
    },
    {          secret:'abc',
            expiresIn:'7d',
  },
  ),
  
  ]);
  return {
    accessToken,
    refreshToken,
  }
  
  
  
  }
 

async getTokens (userId:string,username:string) {
const [accessToken , refreshToken] = await Promise.all([
  this.jwtService.signAsync(
{
sub:userId,
username,

},
   {          secret:'abcd',
          expiresIn:'15m',
},
 ),
   this.jwtService.signAsync(
  {
    sub:userId,
username,

  },
  {          secret:'abc',
          expiresIn:'7d',
},
),

]);
return {
  accessToken,
  refreshToken,
}



}





 


 




 
   async upddateRefreshToken(UserId:string, refreshToken:string){
    const hashedRefreshToken=await this.hashData(refreshToken);
    await  this.usersService.updateUser(UserId,{
      refreshtoken: hashedRefreshToken,
    });
   }

  
  
  async logout(userId: string) {
    this.usersService.updateUser(userId, { refreshtoken: null });
  }


  async refreshTokens(UserId:string, refreshToken:string){

    const user= await this.usersService.getUser(UserId);
    if(!user|| !user.refreshtoken)
    throw new ForbiddenException ('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshtoken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')
    const tokens = await this.getTokens(user.id,user.username);
    await this.upddateRefreshToken (user.id,tokens.refreshToken);
    return tokens;


}

}