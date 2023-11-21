import { PrimaryGeneratedColumn } from 'typeorm';

export class IdEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
