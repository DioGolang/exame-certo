import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateClinicCommand } from './create-clinic.command';
import { Inject } from '@nestjs/common';
import { ClinicCommandRepository } from '../../../domain/repositories/clinic-command.repository';
import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEvent } from '../events/create-clinic.event';
import { ClinicMapper } from '../mappers/clinic.mapper';
import { InvalidClinicException } from '../../../domain/exceptions/invalid-clinic.exception';
import { ClinicDomainService } from '../../../domain/services/clinic/clinic-domain.service';

@CommandHandler(CreateClinicCommand)
export class CreateClinicHandler
  implements ICommandHandler<CreateClinicCommand>
{
  constructor(
    @Inject('ClinicCommandRepository')
    private readonly clinicRepository: ClinicCommandRepository,
    private readonly clinicDomainService: ClinicDomainService,
    private readonly eventBus: EventBus,
    private readonly clinicMapper: ClinicMapper,
  ) {}

  async execute(command: CreateClinicCommand): Promise<void> {
    try {
      const clinic = await this.buildClinic(command);
      await this.saveClinic(clinic);
      await this.publishCreateClinicEvent(clinic);
    } catch (error) {
      throw new InvalidClinicException(
        'Failed to create clinic: ' + error.message,
      );
    }
  }

  private async buildClinic(command: CreateClinicCommand): Promise<Clinic> {
    return this.clinicDomainService.createClinic(command);
  }

  private async saveClinic(clinic: Clinic): Promise<void> {
    const clinicEntity = this.clinicMapper.toPersistence(clinic);
    await this.clinicRepository.save(clinicEntity);
  }

  private async publishCreateClinicEvent(clinic: Clinic): Promise<void> {
    const event = new CreateClinicEvent(
      this.clinicMapper.toCreateClinicEventDto(clinic),
    );
    this.eventBus.publish(event);
  }
}
