import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
