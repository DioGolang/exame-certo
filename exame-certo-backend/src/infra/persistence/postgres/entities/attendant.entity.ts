import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';
import { Address } from '../../../../domain/value-objects/address.vo';
import { SchedulingEntity } from './scheduling.entity';

@Entity()
export class AttendantEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  department: string;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @Column('jsonb')
  address: Address;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => SchedulingEntity, (scheduling) => scheduling.attendant)
  scheduling: SchedulingEntity[];
}
