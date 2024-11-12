import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Nursing } from '../../../domain/entities/nursing.entity';
import { NursingEntity } from '../../../infra/persistence/postgres/entities/nursing.entity';
import { NursingDocument } from '../../../infra/persistence/mongodb/schemas/nursing.schema';
import { RegisteredNursingEventDto } from '../dto/registered-nursing-event.dto';
import { Mapper } from '../../interfaces/mapper.interface';
import { RegisterNursingDto } from '../dto/register-nursing.dto';
import { RegisterNursingCommand } from '../commands/register-nursing.command';

@Injectable()
export class NursingService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('Mapper')
    private readonly nursingMapper: Mapper<
      Nursing,
      NursingEntity,
      NursingDocument,
      RegisteredNursingEventDto
    >,
  ) {}

  async registerNursing(nursing: RegisterNursingDto) {
    console.log(nursing);
    await this.commandBus.execute(new RegisterNursingCommand(nursing));
  }

  // async getNursing(id: string) {
  //   try {
  //     const nursingSchema = await this.queryBus.execute(
  //       new GetNursingQuery(id),
  //     );
  //     return this.nursingMapper.documentForDomain(nursingSchema);
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Error fetching nursing');
  //   }
  // }
}
