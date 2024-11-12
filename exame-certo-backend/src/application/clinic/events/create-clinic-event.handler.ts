// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
// import { CreateClinicEvent } from './create-clinic.event';
// import { Inject } from '@nestjs/common';
// import { ClinicQueryRepository } from '../../../domain/repositories/clinic-query.repository';
// import { ClinicMapper } from '../mappers/clinic.mapper';
//
// @EventsHandler(CreateClinicEvent)
// export class CreateClinicEventHandler
//   implements IEventHandler<CreateClinicEvent>
// {
//   constructor(
//     @Inject('ClinicQueryRepository')
//     private readonly clinicMongoRepository: ClinicQueryRepository,
//     private readonly clinicMapper: ClinicMapper,
//   ) {}
//
//   public async handle(event: CreateClinicEvent): Promise<void> {
//     console.log('CreateClinicEvent', event);
//     const clinic = {
//       id: event.createClinicEventDto.id,
//       passwordHash: event.createClinicEventDto.passwordHash,
//       name: event.createClinicEventDto.name,
//       email: event.createClinicEventDto.email,
//       address: event.createClinicEventDto.address,
//       contactInfo: event.createClinicEventDto.contactInfo,
//       createdAt: event.createClinicEventDto.createdAt,
//       updatedAt: event.createClinicEventDto.updatedAt,
//     };
//     await this.clinicMongoRepository.save(clinic);
//   }
// }
