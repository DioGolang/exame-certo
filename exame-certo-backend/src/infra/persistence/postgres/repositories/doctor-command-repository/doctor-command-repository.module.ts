import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from '../../entities/doctor.entity';
import { DoctorCommandRepositoryImpl } from './doctor-command.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [
    {
      provide: 'DoctorCommandRepository',
      useClass: DoctorCommandRepositoryImpl,
    },
  ],
  exports: ['DoctorCommandRepository'],
})
export class DoctorCommandRepositoryModule {}
