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
  }
}
