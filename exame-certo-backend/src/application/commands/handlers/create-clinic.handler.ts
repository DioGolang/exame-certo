import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClinicCommand } from '../create-clinic.command';
import { ClinicRepository } from '../../../domain/repositories/clinic.repository';
import { Inject } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/builders/builder.factory';

@CommandHandler(CreateClinicCommand)
export class CreateClinicHandler
  implements ICommandHandler<CreateClinicCommand>
{
  constructor(
    @Inject('ClinicRepository')
    private readonly clinicRepository: ClinicRepository,
    @Inject('BuilderFactory')
    private readonly clinicBuilder: BuilderFactory,
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
  }
}
