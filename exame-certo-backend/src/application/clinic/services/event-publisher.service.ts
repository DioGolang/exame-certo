import { EventBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEvent } from '../events/create-clinic.event';
import { ClinicMapper } from '../mappers/clinic.mapper';

@Injectable()
export class EventPublisherService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly clinicMapper: ClinicMapper,
  ) {}

  async publishCreateClinicEvent(clinic: Clinic): Promise<void> {
    const event = new CreateClinicEvent(
      this.clinicMapper.toCreateClinicEventDto(clinic),
    );
    this.eventBus.publish(event);
  }
}
