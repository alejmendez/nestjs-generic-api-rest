import { DeleteDateColumn } from 'typeorm';

export class SoftDeletes {
  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deleteAt: Date;
}
