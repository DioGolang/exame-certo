import { Module } from '@nestjs/common';
import { ClinicRepositoryImpl } from '../../infra/database/repositories/clinic.repository.impl';
import { ClinicController } from '../../presentation/controllers/clinic/clinic.controller';

@Module({
  imports: [],
  controllers: [ClinicController],
  providers: [
    {
      provide: 'ClinicRepository',
      useClass: ClinicRepositoryImpl,
    },
  ],
  exports: [],
})
export class ClinicModule {}
