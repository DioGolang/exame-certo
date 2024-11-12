import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateDoctorCommand } from './create-doctor.command';
import { Inject } from '@nestjs/common';
import { DoctorCommandRepository } from '../../../domain/repositories/doctor-command.repository';
import { CreateDoctorEvent } from '../events/create-doctor.event';
import { Doctor } from '../../../domain/entities/doctor.entity';
import { DoctorDomainService } from '../../../domain/services/doctor/doctor-domain.service';
import { DoctorMapper } from '../mappers/doctor.mapper';
import { InvalidDoctorException } from '../../../domain/exceptions/invalid-doctor.exception';
import { CreateDoctorEventDto } from '../dto/create-doctor-event.dto';

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
      const doctorDto = await this.domainToDto(doctor);
      await this.saveDoctor(doctorDto);
      await this.pushCreateDoctorEvent(doctorDto);
    } catch (error) {
      throw new InvalidDoctorException(
        'Failed to create doctor: ' + error.message,
      );
    }
  }
  private async buildDoctor(command: CreateDoctorCommand): Promise<Doctor> {
    return this.doctorDomainService.createDoctor(command);
  }

  private async domainToDto(doctor: Doctor): Promise<CreateDoctorEventDto> {
    return this.doctorMapper.toRegisteredDomainEventDto(doctor);
  }

  private async saveDoctor(doctor: CreateDoctorEventDto): Promise<void> {
    await this.doctorRepository.save(doctor);
  }
  private async pushCreateDoctorEvent(
    doctor: CreateDoctorEventDto,
  ): Promise<void> {
    this.eventBus.publish(new CreateDoctorEvent(doctor));
  }
}
