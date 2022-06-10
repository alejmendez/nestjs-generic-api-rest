import { Body, Controller, Post } from '@nestjs/common';

import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';

@Controller({
  path: 'register',
  version: '1',
})
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  currentUser(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }
}
