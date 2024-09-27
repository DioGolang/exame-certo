import { Inject, Injectable } from '@nestjs/common';
import { ClinicQueryRepository } from '../../../domain/repositories/clinic-query.repository';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreateClinicEvent } from '../events/create-clinic.event';

@Injectable()
export class ClinicCreatedConsumer {
  constructor(
    @Inject('ClinicQueryRepository')
    private readonly clinicMongoRepository: ClinicQueryRepository,
  ) {}

  @RabbitSubscribe({
    exchange: 'new_clinic_exchange',
    routingKey: 'clinic.created',
    queue: 'clinic_created_queue',
  })
  public async handler(event: CreateClinicEvent) {
    console.log(
      `Recebido evento de criação da clínica: ${JSON.stringify(event)}`,
    );

    // const clinic = {
    //   id: event.createClinicEventDto.id,
    //   name: event.createClinicEventDto.name,
    //   email: event.createClinicEventDto.email,
    //   password: event.createClinicEventDto.password,
    //   address: { ...event.createClinicEventDto.address },
    //   contactInfo: { ...event.createClinicEventDto.contactInfo },
    //   createdAt: event.createClinicEventDto.createdAt,
    //   updatedAt: event.createClinicEventDto.updatedAt,
    //   doctors: [],
    //   patients: [],
    //   exams: [],
    //   anamnesis: [],
    // };
    // await this.clinicMongoRepository.save(clinic);
  }
}
