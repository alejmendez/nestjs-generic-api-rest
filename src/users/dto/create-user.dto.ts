import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
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
  @ApiProperty({ description: 'Password' })
  password: string;
}
