import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Request() req) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }

  @Post('register')
  currentUser(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }
}
