import { Injectable } from '@nestjs/common';
import { ClinicMapper } from '../../clinic/mappers/clinic.mapper';
import { EventBus } from '@nestjs/cqrs';
import { DoctorMapper } from '../mappers/doctor.mapper';
import { Doctor } from '../../../domain/entities/doctor.entity';
import { CreateDoctorEvent } from '../events/create-doctor.event';

@Injectable()
export class EventPublisherService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly doctorMapper: DoctorMapper,
  ) {}

  async publishCreateDoctorEvent(doctor: Doctor): Promise<void> {
    const event = new CreateDoctorEvent(
      this.doctorMapper.toCreateDoctorEventDto(doctor),
    );
    this.eventBus.publish(event);
  }
}
