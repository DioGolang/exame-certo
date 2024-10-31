// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
// import { RegisteredPatientEvent } from './registered-patient.event';
// import { Inject } from '@nestjs/common';
// import { PatientQueryRepository } from '../../../domain/repositories/patient-query.repository';
// import { plainToClass } from 'class-transformer';
// import { Patient } from '../../../infra/persistence/mongodb/schemas/patient.schema';
//
// @EventsHandler(RegisteredPatientEvent)
// export class RegisteredPatientEventHandler
//   implements IEventHandler<RegisteredPatientEvent>
// {
//   constructor(
//     @Inject('PatientQueryRepository')
//     private readonly patientMongoRepository: PatientQueryRepository,
//   ) {}
//
//   async handle(event: RegisteredPatientEvent): Promise<void> {
//     console.log('RegisteredDoctorEvent', event);
//     const patientSchema = plainToClass(Patient, event.registeredPatientEventDto);
//     await this.patientMongoRepository.save(patientSchema);
//   }
// }
