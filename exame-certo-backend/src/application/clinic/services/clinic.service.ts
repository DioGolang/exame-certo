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
import { Clinic } from '../../../domain/entities/clinic.entity';
import { ClinicDomainService } from '../../../domain/services/clinic/clinic-domain.service';
import { ClinicMapper } from '../mappers/clinic.mapper';

@Injectable()
export class ClinicService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly clinicDomainService: ClinicDomainService,
    private readonly clinicMapper: ClinicMapper,
  ) {}

  async createClinic(createClinicDto: CreateClinicDto): Promise<void> {
    await this.commandBus.execute(new CreateClinicCommand(createClinicDto));
  }

  async getClinic(id: string): Promise<Clinic> {
    try {
      const clinicSchema = await this.queryBus.execute(new GetClinicQuery(id));
      return this.clinicMapper.documentForDomain(clinicSchema);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching clinic');
    }
  }
}
