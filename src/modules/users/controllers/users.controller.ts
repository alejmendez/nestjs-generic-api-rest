import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

import { HttpExceptionFilter } from '../../../common/HttpExceptionFilter';
import { AllowedRoles } from '../../../modules/auth/decorators/roles.decorator';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../modules/auth/models/roles.model';
import { User } from '../entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@AllowedRoles(Roles.ADMIN)
@Controller({
  path: 'users',
})
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  public findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public create(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @Put(':id')
  public update(
    @Param('id') id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  public remove(@Param('id') id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}
