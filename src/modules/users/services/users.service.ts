import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository, UpdateResult } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { generateRandomString, hashPassword } from '../../../common/utils';

@Injectable()
export class UsersService {
  readonly numberOfCharactersUsedToGenerateUserValidationToken = 64;

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.usersRepository, {
      sortableColumns: ['id', 'username', 'email'],
      searchableColumns: ['username', 'email'],
      defaultSortBy: [['username', 'DESC']],
      filterableColumns: {},
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneOrFail(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneOrFail({
      email,
    });
  }

  async existUserWithEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    return user !== undefined;
  }

  async create(data: CreateUserDto): Promise<User> {
    data.username = data.username.toLowerCase();
    data.email = data.email.toLowerCase();
    const user = this.usersRepository.create(data);

    const existUserWithEmail = await this.existUserWithEmail(user.email);
    if (existUserWithEmail) {
      throw new HttpException(
        `There is already a user with the email ${user.email}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = await hashPassword(user.password);
    user.verificationToken = generateRandomString(
      this.numberOfCharactersUsedToGenerateUserValidationToken,
    );
    return this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    this.usersRepository.merge(user, data);
    return this.usersRepository.save(user);
  }

  remove(id: string): Promise<UpdateResult> {
    return this.usersRepository.softDelete(id);
  }

  async verify(verificationToken: string) {
    const query = { verificationToken };
    const data = { isActive: true, email_verified_at: new Date() };
    return await this.usersRepository.update(query, data);
  }
}
