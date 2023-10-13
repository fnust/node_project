import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column({ default: false })
  emailVerified: boolean;

  @Column()
  verificationPath: string;

  @Column({ default: 'user-regular' })
  role: string;
}
