import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({ description: 'Password' })
  password: string;
}
