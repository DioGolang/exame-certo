import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateDoctorCommand } from './create-doctor.command';
import { Inject } from '@nestjs/common';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { DoctorCommandRepository } from '../../../domain/repositories/doctor-command.repository';

@CommandHandler(CreateDoctorCommand)
export class CreateDoctorHandler
  implements ICommandHandler<CreateDoctorCommand>
{
  constructor(
    @Inject('DoctorCommandRepository')
    private readonly doctorRepository: DoctorCommandRepository,
    @Inject('BuilderFactory')
    private readonly builderFactory: BuilderFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateDoctorCommand): Promise<void> {
    const doctorBuilder = await this.builderFactory.createDoctorBuilder(
      undefined,
      command.createDoctorDto.password,
    );
    const doctor = await doctorBuilder
      .withName(command.createDoctorDto.name)
      .withEmail(command.createDoctorDto.email)
      .withProfessionalAddress(command.createDoctorDto.address)
      .withRegistrationNumber(command.createDoctorDto.registrationNumber)
      .withSpecialization(command.createDoctorDto.specialization)
      .withContactInfo(command.createDoctorDto.contactInfo)
      .build();

    // await this.doctorRepository.save(doctor);

    const createDoctorEventDto = {
      id: doctor.id,
      password: doctor.password,
      name: doctor.name,
      email: doctor.email,
      professionalAddress: { ...doctor.professionalAddress },
      registrationNumber: doctor.registrationNumber,
      specialization: doctor.specialization,
      contactInfo: { ...doctor.contactInfo },
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
    // const event = new CreateDoctorEvent(createDoctorEventDto);
    // this.eventBus.publish(event);
  }
}
