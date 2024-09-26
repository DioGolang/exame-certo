import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '../../entities/patient.entity';
import { PatientCommandRepositoryImpl } from './patient-command.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  providers: [
    {
      provide: 'PatientCommandRepository',
      useClass: PatientCommandRepositoryImpl,
    },
  ],
  exports: ['PatientCommandRepository'],
})
export class PatientCommandRepositoryModule {}
