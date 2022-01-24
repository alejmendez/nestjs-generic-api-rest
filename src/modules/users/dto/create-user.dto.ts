import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Roles } from '../../auth/models/roles.model';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  readonly role: string;
}
