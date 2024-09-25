import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateDoctorEvent } from './create-doctor.event';
import { Inject } from '@nestjs/common';
import { DoctorQueryRepository } from '../../../domain/repositories/doctor-query.repository';

@EventsHandler(CreateDoctorEvent)
export class CreateDoctorEventHandler
  implements IEventHandler<CreateDoctorEvent>
{
  constructor(
    @Inject('DoctorQueryRepository')
    private readonly doctorMongoRepository: DoctorQueryRepository,
  ) {}

  public async handle(event: CreateDoctorEvent): Promise<void> {
    console.log('CreateDoctorEvent', event);
    const doctor = {
      id: event.createDoctorEventDto.id,
      name: event.createDoctorEventDto.name,
      email: event.createDoctorEventDto.email,
      password: event.createDoctorEventDto.password,
      registrationNumber: event.createDoctorEventDto.registrationNumber,
      specialization: event.createDoctorEventDto.specialization,
      address: { ...event.createDoctorEventDto.address },
      contactInfo: { ...event.createDoctorEventDto.contactInfo },
      createdAt: event.createDoctorEventDto.createdAt,
      updatedAt: event.createDoctorEventDto.updatedAt,
      clinics: [],
      reports: [],
      exams: [],
      anamnesis: [],
    };
    await this.doctorMongoRepository.save(doctor);
  }
}
