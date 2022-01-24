import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AppEntity } from '../../../common/entities/generic.entity';

@Entity('users')
export class User extends AppEntity {
  @Column('varchar', { length: 30 })
  username: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Exclude()
  @Column('varchar', { length: 64 })
  password: string;

  @Column({ name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date;

  @Exclude()
  @Column('varchar', { name: 'verification_token', length: 64 })
  verificationToken: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
