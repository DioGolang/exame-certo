import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterPatientCommand } from './register-patient.command';
import { Inject } from '@nestjs/common';
import { PatientCommandRepository } from '../../../domain/repositories/patient-command.repository';
import { RegisteredPatientEvent } from '../events/registered-patient.event';
import { PatientDomainService } from '../../../domain/services/patient/patient-domain.service';
import { Patient } from '../../../domain/entities/patient.entity';
import { InvalidPatientException } from '../../../domain/exceptions/invalid-patient.exception';
import { OutboxOrchestratorService } from '../../shared/services/outbox/outbox-orchestrator.service';
import { Mapper } from '../../interfaces/mapper.interface';
import { PatientEntity } from '../../../infra/persistence/postgres/entities/patient.entity';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';
import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';

@CommandHandler(RegisterPatientCommand)
export class RegisterPatientHandler
  implements ICommandHandler<RegisterPatientCommand>
{
  constructor(
    @Inject('PatientCommandRepository')
    private readonly patientRepository: PatientCommandRepository,
    private readonly patientDomainService: PatientDomainService,
    private readonly outboxOrchestrator: OutboxOrchestratorService,
    private readonly eventBus: EventBus,
    @Inject('Mapper')
    private readonly patientMapper: Mapper<
      Patient,
      PatientEntity,
      PatientDocument,
      RegisteredPatientEventDto
    >,
  ) {}

  async execute(command: RegisterPatientCommand): Promise<void> {
    try {
      const patient = await this.buildPatient(command);
      await this.savePatient(patient);
      await this.publishRegisteredPatientEvent(patient);
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
    const patientEntity =
      this.patientMapper.toRegisteredDomainEventDto(patient);
    await this.patientRepository.save(patientEntity);
  }

  private async publishRegisteredPatientEvent(patient: Patient): Promise<void> {
    await this.outboxOrchestrator.processEvent(
      'patient.registered',
      this.patientMapper.toRegisteredDomainEventDto(patient),
    );
  }

  private async publishPatientCreatedEvent(patient: Patient): Promise<void> {
    const event = new RegisteredPatientEvent(
      this.patientMapper.toRegisteredDomainEventDto(patient),
    );
    this.eventBus.publish(event);
  }
}
