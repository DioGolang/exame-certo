import { RegisteredAttendantEventDto } from '../dto/registered-attendant-event.dto';
import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { OutboxOrchestratorService } from '../../shared/services/outbox/outbox-orchestrator.service';
import { map, Observable } from 'rxjs';
import { RegisteredAttendantEvent } from '../events/resgistered-attendant.event';

@Injectable()
export class RegisterAttendantSaga {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly outboxOrchestrator: OutboxOrchestratorService,
  ) {}

  @Saga()
  registerAttendantSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RegisteredAttendantEvent),
      map((event) =>
        this.publishRegisteredAttendantEvent(event.registeredAttendantEventDto),
      ),
    );
  };

  private async publishRegisteredAttendantEvent(
    attendantDto: RegisteredAttendantEventDto,
  ): Promise<void> {
    await this.outboxOrchestrator.processEvent(
      'attendant.registered',
      attendantDto,
    );
  }
}
