import { EventBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEvent } from '../events/create-clinic.event';
import { ClinicMapper } from '../mappers/clinic.mapper';

@Injectable()
export class EventPublisherService {
  constructor(private readonly eventBus: EventBus) {}

  async publishCreateClinicEvent(clinic: Clinic): Promise<void> {
    const event = new CreateClinicEvent(
      ClinicMapper.toCreateClinicEventDto(clinic),
    );
    this.eventBus.publish(event);
  }
}