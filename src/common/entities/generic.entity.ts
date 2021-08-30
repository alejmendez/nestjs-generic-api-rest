import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

export class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Expose({ name: 'create_at' })
  @CreateDateColumn({
    name: 'create_at',
  })
  createAt: Date;

  @Expose({ name: 'update_at' })
  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt: Date;

  @Exclude()
  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt: Date;
}
