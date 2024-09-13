import { Module } from '@nestjs/common';
import { ClinicRepositoryImpl } from '../../infra/database/repositories/clinic.repository.impl';
import { CqrsModule } from '@nestjs/cqrs';
import { ClinicService } from '../../application/services/clinic.service';
import { CreateClinicHandler } from '../../application/handlers/create-clinic.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicEntity } from '../../infra/database/entities/clinic.entity';
import { ClinicMapper } from '../../infra/database/repositories/mappers/clinic.mapper';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ClinicEntity])],
  providers: [
    ClinicService,
    CreateClinicHandler,
    ClinicMapper,
    {
      provide: 'ClinicRepository',
      useClass: ClinicRepositoryImpl,
    },
  ],
  exports: [ClinicService],
})
export class ClinicModule {}
