import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Post with id ${id} not found`);
  }
}
