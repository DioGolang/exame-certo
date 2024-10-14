import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';
import { SharedModule } from './shared/shared.module';
import { InfraModule } from './infra/infra.module';
import { PatientModule } from './application/patient/patient.module';
import { DoctorModule } from './application/doctor/doctor.module';
import { ClinicModule } from './application/clinic/clinic.module';

@Module({
  imports: [
    DomainModule,
    ApplicationModule,
    InfraModule,
    PresentationModule,
    SharedModule,
    ClinicModule,
    PatientModule,
    DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
