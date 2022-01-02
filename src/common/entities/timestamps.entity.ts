import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Timestamps {
  @CreateDateColumn({
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt: Date;
}
