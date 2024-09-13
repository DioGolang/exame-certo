import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateClinicCommand } from '../commands/create-clinic.command';
import { CreateClinicDto } from '../dtos/create-clinic.dto';

@Injectable()
export class ClinicService {
  constructor(private readonly commandBus: CommandBus) {}

  async createClinic(createClinicDto: CreateClinicDto): Promise<void> {
    const command = new CreateClinicCommand(createClinicDto);
    await this.commandBus.execute(command);
  }
}
