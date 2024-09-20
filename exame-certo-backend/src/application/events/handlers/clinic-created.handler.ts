import { ClinicReadRepository } from '../../../domain/repositories/clinic-read.repository';
import { ClinicCreatedEvent } from '../clinic-created.event';
import { Inject } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/builders/builder.factory';

export class ClinicCreatedHandler {
  constructor(
    private readonly clinicMongoRepository: ClinicReadRepository,
    @Inject('BuilderFactory')
    private readonly clinicBuilder: BuilderFactory,
  ) {}

  // @RabbitSubscribe({
  //   exchange: 'clinic_exchange',
  //   routingKey: 'clinic.created',
  //   queue: 'clinic_mongo_queue',
  // })

  async handle(event: ClinicCreatedEvent): Promise<void> {
    const clinicBuilder = await this.clinicBuilder.createClinicBuilder(
      event.clinic.id,
      event.clinic.password,
    );

    const clinic = await clinicBuilder
      .withName(event.clinic.name)
      .withEmail(event.clinic.email)
      .withAddress(event.clinic.address)
      .withContactInfo(event.clinic.contactInfo)
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .build();
    await this.clinicMongoRepository.save(clinic);
  }
}
