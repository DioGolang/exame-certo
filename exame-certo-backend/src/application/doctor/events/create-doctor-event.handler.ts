import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateDoctorEvent } from './create-doctor.event';
import { Inject } from '@nestjs/common';
import { DoctorQueryRepository } from '../../../domain/repositories/doctor-query.repository';
import { DoctorMapper } from '../mappers/doctor.mapper';
import { BuilderFactory } from '../../../domain/builders/builder.factory';

@EventsHandler(CreateDoctorEvent)
export class CreateDoctorEventHandler
  implements IEventHandler<CreateDoctorEvent>
{
  constructor(
    @Inject('DoctorQueryRepository')
    private readonly doctorMongoRepository: DoctorQueryRepository,
    @Inject('BuilderFactory')
    private readonly clinicBuilder: BuilderFactory,
    private readonly doctorMapper: DoctorMapper,
  ) {}

  public async handle(event: CreateDoctorEvent): Promise<void> {
    console.log('CreateDoctorEvent', event);
    const doctor = {
      id: event.createDoctorEventDto.id,
      password: event.createDoctorEventDto.password,
      name: event.createDoctorEventDto.name,
      email: event.createDoctorEventDto.email,
      address: event.createDoctorEventDto.address,
      registrationNumber: event.createDoctorEventDto.registrationNumber,
      specialization: event.createDoctorEventDto.specialization,
      contactInfo: event.createDoctorEventDto.contactInfo,
      createdAt: event.createDoctorEventDto.createdAt,
      updatedAt: event.createDoctorEventDto.updatedAt,
    };

    await this.doctorMongoRepository.save(doctor);
  }
}
