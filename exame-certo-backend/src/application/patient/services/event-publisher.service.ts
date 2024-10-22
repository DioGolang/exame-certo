import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CreateClinicEvent } from '../../clinic/events/create-clinic.event';
import { PatientMapper } from '../mappers/patient.mapper';
import { Patient } from '../../../domain/entities/patient.entity';

@Injectable()
export class EventPublisherService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly patientMapper: PatientMapper,
  ) {}

  async publishCreatePatientEvent(patient: Patient): Promise<void> {
    const event = new CreateClinicEvent(
      this.patientMapper.toRegisteredDomainEventDto(patient),
    );
    this.eventBus.publish(event);
  }
}
