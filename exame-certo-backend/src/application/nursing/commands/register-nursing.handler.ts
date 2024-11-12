import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { RegisterNursingCommand } from './register-nursing.command';
import { NursingCommandRepository } from '../../../domain/repositories/nursing-command.repository';
import { Inject } from '@nestjs/common';
import { NursingDomainService } from '../../../domain/services/nursing/nursing-domain.service';
import { Mapper } from '../../interfaces/mapper.interface';
import { Nursing } from '../../../domain/entities/nursing.entity';
import { NursingEntity } from '../../../infra/persistence/postgres/entities/nursing.entity';
import { Nursing as NursingDocument } from '../../../infra/persistence/mongodb/schemas/nursing.schema';
import { RegisteredNursingEventDto } from '../dto/registered-nursing-event.dto';
import { RegisteredNursingEvent } from '../events/resgistered-nursing.event';
import { InvalidNursingException } from '../../../domain/exceptions/invalid-nursing.exception';

@CommandHandler(RegisterNursingCommand)
export class RegisterNursingHandler {
  constructor(
    @Inject('NursingCommandRepository')
    private readonly nursingRepository: NursingCommandRepository,
    private readonly nursingDomainService: NursingDomainService,
    private readonly eventBus: EventBus,
    @Inject('Mapper')
    private readonly nursingMapper: Mapper<
      Nursing,
      NursingEntity,
      NursingDocument,
      RegisteredNursingEventDto
    >,
  ) {}

  async execute(command: RegisterNursingCommand): Promise<void> {
    try {
      const nursing = await this.buildNursing(command);
      const nursingDto = await this.domainToDto(nursing);
      await this.saveNursing(nursingDto);
      await this.publishRegisteredNursingEvent(nursingDto);
    } catch (error) {
      throw new InvalidNursingException(
        'Failed to create nursing: ' + error.message,
      );
    }
  }

  private async buildNursing(
    command: RegisterNursingCommand,
  ): Promise<Nursing> {
    return this.nursingDomainService.registerNursing(command);
  }

  private async domainToDto(
    nursing: Nursing,
  ): Promise<RegisteredNursingEventDto> {
    return this.nursingMapper.toRegisteredDomainEventDto(nursing);
  }

  private async saveNursing(
    nursingDto: RegisteredNursingEventDto,
  ): Promise<void> {
    await this.nursingRepository.save(nursingDto);
  }

  private async publishRegisteredNursingEvent(
    nursingDto: RegisteredNursingEventDto,
  ): Promise<void> {
    const event = new RegisteredNursingEvent(nursingDto);
    this.eventBus.publish(event);
  }
}
