import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClinicCommand } from './create-clinic.command';
import { Inject } from '@nestjs/common';
import { ClinicCommandRepository } from '../../../domain/repositories/clinic-command.repository';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { EventPublisherService } from '../services/event-publisher.service';

@CommandHandler(CreateClinicCommand)
export class CreateClinicHandler
  implements ICommandHandler<CreateClinicCommand>
{
  constructor(
    @Inject('ClinicCommandRepository')
    private readonly clinicRepository: ClinicCommandRepository,
    @Inject('BuilderFactory')
    private readonly clinicBuilder: BuilderFactory,
    private readonly eventPublisherService: EventPublisherService,
  ) {}

  async execute(command: CreateClinicCommand): Promise<void> {
    const clinicBuilder = await this.clinicBuilder.createClinicBuilder(
      undefined,
      command.createClinicDto.password,
    );
    const clinic = await clinicBuilder
      .withName(command.createClinicDto.name)
      .withEmail(command.createClinicDto.email)
      .withAddress(command.createClinicDto.address)
      .withContactInfo(command.createClinicDto.contactInfo)
      .build();
    //console.log(await clinicMapper.toPersistence(clinic));
    //console.log(clinic);
    await this.clinicRepository.save(clinic);
    await this.eventPublisherService.publishCreateClinicEvent(clinic);
    //clinic.address.toJson() e clinic.contactInfo.toJson() clinic.email.value
  }
}
