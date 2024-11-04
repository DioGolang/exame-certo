import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { ContactInfo } from '../../mongodb/schemas/contact-info.schema';
import { Address } from '../../mongodb/schemas/address.schema';
import { AnamnesisEntity } from './anamnesis.entity';
import { NursingLevel } from '../../../../domain/enums/nursing-level.enum';
import { ScreeningEntity } from './screening.entity';
import { ClinicEntity } from './clinic.entity';

@Entity()
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
  contactInfo: ContactInfo;

  @Column('jsonb')
  address: Address;

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