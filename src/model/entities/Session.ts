import {
  BaseEntity,
  Entity,
  Unique,
  Column,
  PrimaryColumn,
  Generated,
  OneToOne,
} from 'typeorm';

@Entity()
@Unique(['tokenRefresh', 'tokenAccess'])
export class Session extends BaseEntity {

  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  tokenRefresh: string;

  @Column()
  tokenAccess: string;
}
