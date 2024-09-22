import { Module } from '@nestjs/common';
import { ClinicQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/clinic-query-repository/clinic-query-repository.module';
import { ClinicCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/clinic-command-repository/clinic-command-repository.module';
import { ClinicService } from './services/clinic.service';
import { CreateClinicCommand } from './commands/create-clinic.command';
import { CqrsModule } from '@nestjs/cqrs';
import { BuildersModule } from '../../domain/builders/builders.module';

@Module({
  imports: [
    CqrsModule,
    ClinicQueryRepositoryModule,
    ClinicCommandRepositoryModule,
    BuildersModule,
  ],
  providers: [ClinicService, CreateClinicCommand],
  exports: [ClinicService, CreateClinicCommand],
})
export class ClinicModule {}
