import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      email,
    });
  }

  async existUserWithEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    return user !== undefined;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(data);
    user.email = user.email.toLowerCase();

    const existUserWithEmail = await this.existUserWithEmail(user.email);
    if (existUserWithEmail) {
      throw new HttpException(
        `There is already a user with the email ${user.email}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    user.username = user.username.toLowerCase();
    user.password = await hashSync(user.password, 15);
    user.verificationToken = this.generateRandomString(64);
    return this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    this.usersRepository.merge(user, data);
    return this.usersRepository.save(user);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }

  async verify(verificationToken: string) {
    const query = { verificationToken };
    const data = { isActive: true, email_verified_at: new Date() };
    return await this.usersRepository.update(query, data);
  }

  generateRandomString(length = 10): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
