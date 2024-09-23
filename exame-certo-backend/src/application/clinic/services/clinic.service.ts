import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from '../dto/create-clinic.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateClinicCommand } from '../commands/create-clinic.command';

@Injectable()
export class ClinicService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createClinic(createClinicDto: CreateClinicDto): Promise<void> {
    await this.commandBus.execute(new CreateClinicCommand(createClinicDto));
  }
}
