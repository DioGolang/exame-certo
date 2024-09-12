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
    const clinic = await ClinicBuilder.create(command.createClinicDto.password)
      .withName(command.createClinicDto.name)
      .withEmail(command.createClinicDto.email)
      .withAddress(command.createClinicDto.address)
      .withContactInfo(command.createClinicDto.contactInfo)
      .build();
    await this.clinicRepository.save(clinic);
  }
}
