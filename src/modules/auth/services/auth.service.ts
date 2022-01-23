import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { hashCompare } from '../../../common/utils';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const isMatch = await hashCompare(password, user.password);
      if (isMatch) {
        return user;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  generateJWT(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      user,
    };
  }
}
