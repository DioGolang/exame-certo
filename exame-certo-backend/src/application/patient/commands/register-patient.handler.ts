import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterPatientCommand } from './register-patient.command';
import { Inject } from '@nestjs/common';
import { PatientCommandRepository } from '../../../domain/repositories/patient-command.repository';
import { RegisteredPatientEvent } from '../events/registered-patient.event';
import { PatientMapper } from '../mappers/patient.mapper';
import { PatientDomainService } from '../../../domain/services/patient/patient-domain.service';
import { Patient } from '../../../domain/entities/patient.entity';
import { InvalidPatientException } from '../../../domain/exceptions/invalid-patient.exception';
import { OutboxApplicationService } from '../../shared/services/outbox/outbox-application.service';

@CommandHandler(RegisterPatientCommand)
export class RegisterPatientHandler
  implements ICommandHandler<RegisterPatientCommand>
{
  constructor(
    @Inject('PatientCommandRepository')
    private readonly patientRepository: PatientCommandRepository,
    private readonly patientDomainService: PatientDomainService,
    // private readonly outbox: OutboxApplicationService,
    private readonly eventBus: EventBus,
    private readonly patientMapper: PatientMapper,
  ) {}

  async execute(command: RegisterPatientCommand): Promise<void> {
    try {
      const patient = await this.buildPatient(command);
      await this.savePatient(patient);
      await this.publishPatientCreatedEvent(patient);
    } catch (error) {
      throw new InvalidPatientException(
        'Failed to create patient: ' + error.message,
      );
    }
  }

  private async buildPatient(
    command: RegisterPatientCommand,
  ): Promise<Patient> {
    return this.patientDomainService.createPatient(command);
  }
  private async savePatient(patient: Patient): Promise<void> {
    const patientEntity = this.patientMapper.toCreateDomainEventDto(patient);
    await this.patientRepository.save(patientEntity);
  }

  private async outboxRepositorySave(): Promise<void> {}

  private async publishPatientCreatedEvent(patient: Patient): Promise<void> {
    const event = new RegisteredPatientEvent(
      this.patientMapper.toCreateDomainEventDto(patient),
    );
    this.eventBus.publish(event);
  }
}
