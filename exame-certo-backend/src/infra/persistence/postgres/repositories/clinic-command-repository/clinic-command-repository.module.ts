import { Module } from '@nestjs/common';
import { ClinicCommandRepositoryImpl } from './clinic-command-repository';
import { ClinicEntity } from '../../entities/clinic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicEntity])],
  providers: [
    {
      provide: 'ClinicCommandRepository',
      useClass: ClinicCommandRepositoryImpl,
    },
  ],
  exports: ['ClinicCommandRepository'],
})
export class ClinicCommandRepositoryModule {}
