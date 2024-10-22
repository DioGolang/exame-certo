import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateDoctorCommand } from './create-doctor.command';
import { Inject } from '@nestjs/common';
import { DoctorCommandRepository } from '../../../domain/repositories/doctor-command.repository';
import { CreateDoctorEvent } from '../events/create-doctor.event';
import { Doctor } from '../../../domain/entities/doctor.entity';
import { DoctorDomainService } from '../../../domain/services/doctor/doctor-domain.service';
import { DoctorMapper } from '../mappers/doctor.mapper';
import { InvalidDoctorException } from '../../../domain/exceptions/invalid-doctor.exception';

@CommandHandler(CreateDoctorCommand)
export class CreateDoctorHandler
  implements ICommandHandler<CreateDoctorCommand>
{
  constructor(
    @Inject('DoctorCommandRepository')
    private readonly doctorRepository: DoctorCommandRepository,
    private readonly doctorDomainService: DoctorDomainService,
    private readonly eventBus: EventBus,
    private readonly doctorMapper: DoctorMapper,
  ) {}

  async execute(command: CreateDoctorCommand): Promise<void> {
    try {
      const doctor = await this.buildDoctor(command);
      await this.saveDoctor(doctor);
      await this.pushCreateDoctorEvent(doctor);
    } catch (error) {
      throw new InvalidDoctorException(
        'Failed to create doctor: ' + error.message,
      );
    }
  }

  private async buildDoctor(command: CreateDoctorCommand): Promise<Doctor> {
    return this.doctorDomainService.createDoctor(command);
  }

  private async saveDoctor(doctor: Doctor): Promise<void> {
    const doctorEntity = this.doctorMapper.toPersistence(doctor);
    await this.doctorRepository.save(doctorEntity);
  }
  private async pushCreateDoctorEvent(doctor: Doctor): Promise<void> {
    const event = new CreateDoctorEvent(
      this.doctorMapper.toRegisteredDomainEventDto(doctor),
    );
    this.eventBus.publish(event);
  }
}
