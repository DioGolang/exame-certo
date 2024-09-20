import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ClinicReadRepository } from '../../domain/repositories/clinic-read.repository';

@Injectable()
export class ClinicSaga {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly clinicReadRepository: ClinicReadRepository,
  ) {}
}
