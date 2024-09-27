import { EventBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEvent } from '../events/create-clinic.event';

@Injectable()
export class EventPublisherService {
  constructor(private readonly eventBus: EventBus) {}

  async publishCreateClinicEvent(clinic: Clinic): Promise<void> {
    const createClinicEventDto = {
      id: clinic.id,
      password: clinic.password,
      name: clinic.name,
      email: clinic.email,
      address: clinic.address,
      contactInfo: { ...clinic.contactInfo },
      createdAt: clinic.createdAt,
      updatedAt: clinic.updatedAt,
    };
    const event = new CreateClinicEvent(createClinicEventDto);
    this.eventBus.publish(event);
  }
}
