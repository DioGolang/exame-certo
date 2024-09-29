import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClinicDto } from '../dto/create-clinic.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateClinicCommand } from '../commands/create-clinic.command';
import { GetClinicQuery } from '../queries/get-clinic.query';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { Clinic } from '../../../domain/entities/clinic.entity';

@Injectable()
export class ClinicService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('BuilderFactory') private readonly clinicBuilder: BuilderFactory,
  ) {}

  async createClinic(createClinicDto: CreateClinicDto): Promise<void> {
    await this.commandBus.execute(new CreateClinicCommand(createClinicDto));
  }

  async getClinic(id: string): Promise<Clinic> {
    try {
      const clinicSchema = await this.queryBus.execute(new GetClinicQuery(id));
      const builderClinic = await this.clinicBuilder.createClinicBuilder(
        id,
        undefined,
        clinicSchema.password,
      );
      const clinic = await builderClinic
        .withName(clinicSchema.name)
        .withEmail(clinicSchema.email)
        .withAddress(clinicSchema.address)
        .withContactInfo(clinicSchema.contactInfo)
        .build();
      return clinic;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching clinic');
    }
  }
}
