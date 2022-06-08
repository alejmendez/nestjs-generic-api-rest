import { Body, Controller, Get } from '@nestjs/common';

import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';

@Controller({
  path: 'register',
  version: '1',
})
export class CurrentUserController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  currentUser(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }
}
