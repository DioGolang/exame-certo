import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateClinicCommand } from './create-clinic.command';
import { Inject } from '@nestjs/common';
import { ClinicCommandRepository } from '../../../domain/repositories/clinic-command.repository';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEvent } from '../events/create-clinic.event';
import { ClinicMapper } from '../mappers/clinic.mapper';

@CommandHandler(CreateClinicCommand)
export class CreateClinicHandler
  implements ICommandHandler<CreateClinicCommand>
{
  constructor(
    @Inject('ClinicCommandRepository')
    private readonly clinicRepository: ClinicCommandRepository,
    @Inject('BuilderFactory')
    private readonly clinicBuilder: BuilderFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateClinicCommand): Promise<void> {
    try {
      const clinic = await this.buildClinic(command);
      await this.saveClinic(clinic);
      await this.publishCreateClinicEvent(clinic);
    } catch (error) {
      throw new Error(error);
    }
  }

  private async buildClinic(command: CreateClinicCommand) {
    const clinicBuilder = await this.clinicBuilder.createClinicBuilder(
      undefined,
      command.createClinicDto.password,
    );
    return await clinicBuilder
      .withName(command.createClinicDto.name)
      .withEmail(command.createClinicDto.email)
      .withAddress(command.createClinicDto.address)
      .withContactInfo(command.createClinicDto.contactInfo)
      .build();
  }

  private async saveClinic(clinic: Clinic) {
    await this.clinicRepository.save(clinic);
  }

  private async publishCreateClinicEvent(clinic: Clinic): Promise<void> {
    const event = new CreateClinicEvent(
      ClinicMapper.toCreateClinicEventDto(clinic),
    );
    this.eventBus.publish(event);
  }
}
