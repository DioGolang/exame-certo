import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreatePatientCommand } from './create-patient.command';
import { Inject } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { PatientCommandRepository } from '../../../domain/repositories/patient-command.repository';

@CommandHandler(CreatePatientCommand)
export class CreatePatientHandler
  implements ICommandHandler<CreatePatientCommand>
{
  constructor(
    @Inject('PatientCommandRepository')
    private readonly patientRepository: PatientCommandRepository,
    @Inject('BuilderFactory')
    private readonly builderFactory: BuilderFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreatePatientCommand): Promise<void> {
    const patientBuilder = await this.builderFactory.createPatientBuilder(
      undefined,
      command.createPatientDto.password,
    );
    const patient = await patientBuilder
      .withName(command.createPatientDto.name)
      .withLastName(command.createPatientDto.lastName)
      .withEmail(command.createPatientDto.email)
      .withDateOfBirth(command.createPatientDto.dateOfBirth)
      .withSex(command.createPatientDto.sex)
      .withMaritalStatus(command.createPatientDto.maritalStatus)
      .withDocumentation(command.createPatientDto.documentation)
      .withSocioeconomicInformation(
        command.createPatientDto.socioeconomicInformation,
      )
      .withAddress(command.createPatientDto.address)
      .withContactInfo(command.createPatientDto.contactInfo)
      .build();

    const createPatientDto = {
      id: patient.id,
      name: patient.name,
      lastName: patient.lastName,
      email: patient.email,
      password: patient.password,
      dateOfBirth: patient.dateOfBirth,
      sex: patient.sex,
      maritalStatus: patient.maritalStatus,
      documentation: {
        cpf: { cpf: patient.documentation.cpf.value },
        rg: { rg: patient.documentation.rg.value },
        cnh: { cnh: patient.documentation.cnh.value },
        cns: { cns: patient.documentation.cns.value },
      },
      socioeconomicInformation: { ...patient.socioeconomicInformation },
      address: { ...patient.address },
      contactInfo: { ...patient.contactInfo },
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };

    await this.patientRepository.save(createPatientDto);

    // const event = new CreatePatientEvent(createPatientEventDto);
    // this.eventBus.publish(event);
  }
}
