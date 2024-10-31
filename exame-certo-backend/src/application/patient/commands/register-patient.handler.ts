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
      const patientDto = await this.domainToDto(patient);
      await this.savePatient(patientDto);
      await this.publishRegisteredPatientEvent(patientDto);
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

  private async domainToDto(
    patient: Patient,
  ): Promise<RegisteredPatientEventDto> {
    return this.patientMapper.toRegisteredDomainEventDto(patient);
  }

  private async savePatient(
    patientDto: RegisteredPatientEventDto,
  ): Promise<void> {
    await this.patientRepository.save(patientDto);
  }

  private async publishRegisteredPatientEvent(
    patientDto: RegisteredPatientEventDto,
  ): Promise<void> {
    await this.eventBus.publish(new RegisteredPatientEvent(patientDto));
  }
}
