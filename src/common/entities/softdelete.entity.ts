import { DeleteDateColumn } from 'typeorm';

export class SoftDeletes {
  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt: Date;
}
