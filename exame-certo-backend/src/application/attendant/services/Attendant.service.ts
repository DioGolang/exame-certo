import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Mapper } from '../../interfaces/mapper.interface';
import { Attendant } from '../../../domain/entities/attendant.entity';
import { AttendantEntity } from '../../../infra/persistence/postgres/entities/attendant.entity';
import { Attendant as AttendantDocument } from '../../../infra/persistence/mongodb/schemas/attendant.schema';
import { RegisteredAttendantEventDto } from '../dto/registered-attendant-event.dto';
import { RegisterAttendantDto } from '../dto/register-attendant.dto';
import { RegisterAttendantCommand } from '../commands/register-attendant.command';

@Injectable()
export class AttendantService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('Mapper')
    private readonly attendantMapper: Mapper<
      Attendant,
      AttendantEntity,
      AttendantDocument,
      RegisteredAttendantEventDto
    >,
  ) {}
  async registerAttendant(attendant: RegisterAttendantDto) {
    await this.commandBus.execute(new RegisterAttendantCommand(attendant));
  }
  // async getAttendant(id: string) {
  //   try {
  //     const attendantSchema = await this.queryBus.execute(
  //       new GetAttendantQuery(id),
  //     );
  //     return this.attendantMapper.documentForDomain(attendantSchema);
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Error fetching attendant');
  //   }
  // }
}
