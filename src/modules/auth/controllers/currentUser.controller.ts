import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AllowedRoles } from '../decorators/roles.decorator';
import { Roles } from '../models/roles.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

import { UsersService } from '../../users/services/users.service';

@Controller({
  path: 'auth',
  version: '1',
})
export class CurrentUserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('current/user')
  @UseInterceptors(ClassSerializerInterceptor)
  @AllowedRoles(Roles.AUTH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  currentUser(@Request() req) {
    const data = req.user;
    const user = this.usersService.findOne(data.sub);
    return user;
  }
}
