import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateClinicEvent } from './create-clinic.event';
import { Inject } from '@nestjs/common';
import { ClinicQueryRepository } from '../../../domain/repositories/clinic-query.repository';

@EventsHandler(CreateClinicEvent)
export class CreateClinicEventHandler
  implements IEventHandler<CreateClinicEvent>
{
  constructor(
    @Inject('ClinicQueryRepository')
    private readonly clinicMongoRepository: ClinicQueryRepository,
  ) {}

  public async handle(event: CreateClinicEvent): Promise<void> {
    console.log('CreateClinicEvent', event);
    const clinic = {
      id: event.createClinicEventDto.id,
      name: event.createClinicEventDto.name,
      email: event.createClinicEventDto.email,
      password: event.createClinicEventDto.password,
      address: { ...event.createClinicEventDto.address },
      contactInfo: { ...event.createClinicEventDto.contactInfo },
      createdAt: event.createClinicEventDto.createdAt,
      updatedAt: event.createClinicEventDto.updatedAt,
      doctors: [],
      patients: [],
      exams: [],
      anamnesis: [],
    };
    await this.clinicMongoRepository.save(clinic);
  }
}
