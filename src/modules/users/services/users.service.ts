import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { generateRandomString, hashPassword } from '../../../common/utils';

@Injectable()
export class UsersService {
  readonly numberOfCharactersUsedToGenerateUserValidationToken = 64;

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public findAll(query: PaginateQuery) {
    return paginate(query, this.usersRepository, {
      sortableColumns: ['id', 'username', 'email'],
      searchableColumns: ['username', 'email'],
      defaultSortBy: [['username', 'DESC']],
      filterableColumns: {},
    });
  }

  public async findOne(id: string) {
    return await this.usersRepository.findOneOrFail({ where: { id } });
  }

  public async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    return null;
  }

  public async existUserWithEmail(email: string) {
    const user = await this.findOneByEmail(email);
    return user !== null;
  }

  public async create(data: CreateUserDto) {
    data.username = data.username.toLowerCase();
    data.email = data.email.toLowerCase();
    const user = await this.usersRepository.create(data);
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

  public async update(id: string, data: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    this.usersRepository.merge(user, data);
    return this.usersRepository.save(user);
  }

  public async remove(id: string) {
    try {
      const user = await this.findOne(id);
      await this.usersRepository.softDelete(id);
      return user;
    } catch (error) {
      throw new HttpException(
        'Error when trying to delete user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async verify(verificationToken: string) {
    const query = { verificationToken };
    const data = { isActive: true, email_verified_at: new Date() };
    return await this.usersRepository.update(query, data);
  }
}
