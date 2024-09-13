import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClinicCommand } from '../commands/create-clinic.command';
import { ClinicRepository } from '../../domain/repositories/clinic.repository';
import { Inject } from '@nestjs/common';
import { ClinicBuilder } from '../../domain/builders/clinic.builder';

@CommandHandler(CreateClinicCommand)
export class CreateClinicHandler
  implements ICommandHandler<CreateClinicCommand>
{
  constructor(
    @Inject('ClinicRepository')
    private readonly clinicRepository: ClinicRepository,
  ) {}

  async execute(command: CreateClinicCommand): Promise<void> {
    const clinicBuilder = await ClinicBuilder.createOrRehydrate(
      null,
      command.createClinicDto.password,
    );

    const clinic = await clinicBuilder
      .withName(command.createClinicDto.name)
      .withEmail(command.createClinicDto.email)
      .withAddress(command.createClinicDto.address)
      .withContactInfo(command.createClinicDto.contactInfo)
      .build();
    console.log(clinic);
    await this.clinicRepository.save(clinic);
  }
}
