/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '../role.enum';
type JwtPayload = {
  sub: string;
  username: string;
  roles: Role [],
 
  
  
};
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'abcd',
    });
  }
  validate(payload: JwtPayload) {
    return payload;
  }
}
