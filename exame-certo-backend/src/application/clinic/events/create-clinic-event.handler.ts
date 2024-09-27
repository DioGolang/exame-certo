import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateClinicEvent } from './create-clinic.event';
import { Inject } from '@nestjs/common';
import { ClinicQueryRepository } from '../../../domain/repositories/clinic-query.repository';
import { BuilderFactory } from '../../../domain/builders/builder.factory';

@EventsHandler(CreateClinicEvent)
export class CreateClinicEventHandler
  implements IEventHandler<CreateClinicEvent>
{
  constructor(
    @Inject('ClinicQueryRepository')
    private readonly clinicMongoRepository: ClinicQueryRepository,
    @Inject('BuilderFactory')
    private readonly clinicBuilder: BuilderFactory,
  ) {}

  public async handle(event: CreateClinicEvent): Promise<void> {
    console.log('CreateClinicEvent', event);
    // const clinicBuilder = await this.clinicBuilder.createClinicBuilder(
    //   event.createClinicEventDto.id,
    //   undefined,
    //   event.createClinicEventDto.password,
    // );
    //
    // const clinic2 = await clinicBuilder
    //   .withName(event.createClinicEventDto.name)
    //   .withEmail(event.createClinicEventDto.email)
    //   .withAddress(event.createClinicEventDto.address)
    //   .withContactInfo(event.createClinicEventDto.contactInfo)
    //   .withCreatedAt(event.createClinicEventDto.createdAt)
    //   .withUpdatedAt(event.createClinicEventDto.updatedAt)
    //   .build();
    // console.log(clinic2);

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
