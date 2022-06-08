import { Entity, Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { AppEntity } from '../../../common/entities/generic.entity';

@Entity('users')
export class User extends AppEntity {
  @Expose()
  @Column('varchar', { length: 30 })
  username: string;

  @Expose()
  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Exclude()
  @Column('varchar', { length: 64 })
  password: string;

  @Exclude()
  @Column({ name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date;

  @Exclude()
  @Column('varchar', { name: 'verification_token', length: 64 })
  verificationToken: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Expose()
  @Column({ type: 'varchar', length: 100 })
  role: string;

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
