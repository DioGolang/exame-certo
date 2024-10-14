import { Module } from '@nestjs/common';
import { ClinicValidationStrategy } from './clinic-validation.strategy';
import { DoctorValidationStrategy } from './doctor-validation.strategy';
import { PatientValidationStrategy } from './patient-validation.strategy';
import { FieldValidatorConstraint } from './field.validator';
import { ClinicQueryRepositoryModule } from '../../../infra/persistence/mongodb/repositories/clinic-query-repository/clinic-query-repository.module';
import { DoctorQueryRepositoryModule } from '../../../infra/persistence/mongodb/repositories/doctor-query-repository/doctor-query-repository.module';
import { PatientQueryRepositoryModule } from '../../../infra/persistence/mongodb/repositories/patient-query-repository/patient-query-repository.module';

@Module({
  imports: [
    ClinicQueryRepositoryModule,
    DoctorQueryRepositoryModule,
    PatientQueryRepositoryModule,
  ],
  providers: [
    FieldValidatorConstraint,
    ClinicValidationStrategy,
    DoctorValidationStrategy,
    PatientValidationStrategy,
    {
      provide: 'UniqueValidationStrategy',
      useFactory: (
        clinicValidation: ClinicValidationStrategy,
        patientValidation: PatientValidationStrategy,
        doctorValidation: DoctorValidationStrategy,
      ) => ({
        emailUniqueForClinic: clinicValidation,
        emailUniqueForPatient: patientValidation,
        emailUniqueForDoctor: doctorValidation,
      }),
      inject: [
        ClinicValidationStrategy,
        PatientValidationStrategy,
        DoctorValidationStrategy,
      ],
    },
  ],
  exports: [
    'UniqueValidationStrategy',
    FieldValidatorConstraint,
    ClinicValidationStrategy,
    DoctorValidationStrategy,
    PatientValidationStrategy,
  ],
})
export class ValidatorsModule {}
