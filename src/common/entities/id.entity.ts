import { PrimaryGeneratedColumn } from 'typeorm';

export class IdEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
