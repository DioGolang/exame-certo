import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateClinicCommand } from './create-clinic.command';
import { Inject } from '@nestjs/common';
import { ClinicCommandRepository } from '../../../domain/repositories/clinic-command.repository';
import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEvent } from '../events/create-clinic.event';
import { ClinicMapper } from '../mappers/clinic.mapper';
import { InvalidClinicException } from '../../../domain/exceptions/invalid-clinic.exception';
import { ClinicDomainService } from '../../../domain/services/clinic/clinic-domain.service';
import { CreateClinicEventDto } from '../dto/create-clinic-event.dto';

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
      const clinicDto = await this.domainToDto(clinic);
      await this.saveClinic(clinicDto);
      await this.publishCreateClinicEvent(clinicDto);
    } catch (error) {
      throw new InvalidClinicException(
        'Failed to create clinic: ' + error.message,
      );
    }
  }

  private async buildClinic(command: CreateClinicCommand): Promise<Clinic> {
    return this.clinicDomainService.createClinic(command);
  }

  private async domainToDto(clinic: Clinic): Promise<CreateClinicEventDto> {
    return this.clinicMapper.toRegisteredDomainEventDto(clinic);
  }

  private async saveClinic(clinicDto: CreateClinicEventDto): Promise<void> {
    await this.clinicRepository.save(clinicDto);
  }

  private async publishCreateClinicEvent(
    clinicDto: CreateClinicEventDto,
  ): Promise<void> {
    await this.eventBus.publish(new CreateClinicEvent(clinicDto));
  }
}
