import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { InfraModule } from './infra/infra.module';
import { PresentationModule } from './presentation/presentation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infra/database/typeorm.config';
import { SharedModule } from './shared/shared.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ClinicModule } from './modules/clinic/clinic.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DomainModule,
    ApplicationModule,
    InfraModule,
    PresentationModule,
    SharedModule,
    CqrsModule,
    ClinicModule,
    DoctorModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
