import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { AnamnesisEntity } from './anamnesis.entity';
import { NursingLevel } from '../../../../domain/enums/nursing-level.enum';
import { ScreeningEntity } from './screening.entity';
import { ClinicEntity } from './clinic.entity';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';
import { Address } from '../../../../domain/value-objects/address.vo';

@Entity('nursing')
export class NursingEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column('jsonb')
  address: Address;

  @Column('jsonb')
  contactInfo: ContactInfo;

  @Column({ type: 'enum', enum: NursingLevel })
  nursingLevel: NursingLevel;

  @Column({ unique: true })
  COREN?: string;

  @OneToMany(() => AnamnesisEntity, (anamnesis) => anamnesis.nursing, {
    lazy: true,
  })
  anamnesis: AnamnesisEntity[];

  @OneToMany(() => ScreeningEntity, (screening) => screening.nursing)
  screening: ScreeningEntity[];

  @ManyToMany(() => ClinicEntity, (clinics) => clinics.nursing, { lazy: true })
  clinics: ClinicEntity[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt?: Date;
}
