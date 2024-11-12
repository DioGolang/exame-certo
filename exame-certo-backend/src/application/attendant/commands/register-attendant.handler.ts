import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { RegisterAttendantCommand } from './register-attendant.command';
import { AttendantCommandRepository } from '../../../domain/repositories/attendant-command.repository';
import { Inject } from '@nestjs/common';
import { AttendantDomainService } from '../../../domain/services/attendant/attendant-domain.service';
import { Mapper } from '../../interfaces/mapper.interface';
import { Attendant } from '../../../domain/entities/attendant.entity';
import { AttendantEntity } from '../../../infra/persistence/postgres/entities/attendant.entity';
import { Attendant as AttendantDocument } from '../../../infra/persistence/mongodb/schemas/attendant.schema';
import { RegisteredAttendantEventDto } from '../dto/registered-attendant-event.dto';
import { RegisteredAttendantEvent } from '../events/resgistered-attendant.event';
import { InvalidAttendantException } from '../../../domain/exceptions/invalid-attendant.exception';

@CommandHandler(RegisterAttendantCommand)
export class RegisterAttendantHandler {
  constructor(
    @Inject('AttendantCommandRepository')
    private readonly attendantRepository: AttendantCommandRepository,
    private readonly attendantDomainService: AttendantDomainService,
    private readonly eventBus: EventBus,
    @Inject('Mapper')
    private readonly attendantMapper: Mapper<
      Attendant,
      AttendantEntity,
      AttendantDocument,
      RegisteredAttendantEventDto
    >,
  ) {}

  async execute(command: RegisterAttendantCommand): Promise<void> {
    try {
      const attendant = await this.buildAttendant(command);
      const attendantDto = await this.domainToDto(attendant);
      await this.saveAttendant(attendantDto);
      await this.publishRegisteredAttendantEvent(attendantDto);
    } catch (error) {
      throw new InvalidAttendantException(
        'Failed to create attendant: ' + error.message,
      );
    }
  }

  private async buildAttendant(
    command: RegisterAttendantCommand,
  ): Promise<Attendant> {
    return this.attendantDomainService.RegisterAttendant(command);
  }

  private async domainToDto(
    attendant: Attendant,
  ): Promise<RegisteredAttendantEventDto> {
    return this.attendantMapper.toRegisteredDomainEventDto(attendant);
  }

  private async saveAttendant(
    attendantDto: RegisteredAttendantEventDto,
  ): Promise<void> {
    await this.attendantRepository.save(attendantDto);
  }

  private async publishRegisteredAttendantEvent(
    attendantDto: RegisteredAttendantEventDto,
  ): Promise<void> {
    const event = new RegisteredAttendantEvent(attendantDto);
    this.eventBus.publish(event);
  }
}
