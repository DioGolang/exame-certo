import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDoctorCommand } from '../commands/create-doctor.command';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { GetDoctorQuery } from '../queries/get-doctor.query';
import { Doctor } from '../../../domain/entities/doctor.entity';
import { DoctorDomainService } from '../../../domain/services/doctor/doctor-domain.service';
import { DoctorMapper } from '../mappers/doctor.mapper';

@Injectable()
export class DoctorService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly doctorDomainService: DoctorDomainService,
    private readonly doctorMapper: DoctorMapper,
  ) {}

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<void> {
    await this.commandBus.execute(new CreateDoctorCommand(createDoctorDto));
  }

  async getDoctor(id: string): Promise<Doctor> {
    try {
      const doctorSchema = await this.queryBus.execute(new GetDoctorQuery(id));
      return this.doctorMapper.documentForDomain(doctorSchema);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching Doctor');
    }
  }
}
