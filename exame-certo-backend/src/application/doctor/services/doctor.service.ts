import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { CreateDoctorCommand } from '../commands/create-doctor.command';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { GetDoctorQuery } from '../queries/get-doctor.query';
import { Doctor } from '../../../domain/entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('BuilderFactory') private readonly doctorBuilder: BuilderFactory,
  ) {}

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<void> {
    await this.commandBus.execute(new CreateDoctorCommand(createDoctorDto));
  }

  async getDoctor(id: string): Promise<Doctor> {
    const doctorSchema = await this.queryBus.execute(new GetDoctorQuery(id));
    const builderDoctor = await this.doctorBuilder.createDoctorBuilder(
      id,
      undefined,
      doctorSchema.password,
    );
    const doctor = await builderDoctor
      .withName(doctorSchema.name)
      .withEmail(doctorSchema.email)
      .withProfessionalAddress(doctorSchema.address)
      .withContactInfo(doctorSchema.contactInfo)
      .build();
    return doctor;
  }
}
