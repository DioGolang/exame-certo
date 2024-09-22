import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClinicCommand } from './create-clinic.command';
import { Inject } from '@nestjs/common';
import { ClinicCommandRepository } from '../../../domain/repositories/clinic-command.repository';
import { BuilderFactory } from '../../../domain/builders/builder.factory';

@CommandHandler(CreateClinicCommand)
export class CreateClinicHandler
  implements ICommandHandler<CreateClinicCommand>
{
  constructor(
    @Inject('ClinicCommandRepository')
    private readonly clinicRepository: ClinicCommandRepository,
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

    // const createClinicEventDto = {
    //   id: clinic.id,
    //   password: clinic.password,
    //   name: clinic.name,
    //   email: clinic.email,
    //   address: { ...clinic.address },
    //   contactInfo: { ...clinic.contactInfo },
    //   createdAt: clinic.createdAt,
    //   updatedAt: clinic.updatedAt,
    // };
  }
}
