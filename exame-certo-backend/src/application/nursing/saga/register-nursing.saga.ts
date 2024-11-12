import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { OutboxOrchestratorService } from '../../shared/services/outbox/outbox-orchestrator.service';
import { map, Observable } from 'rxjs';
import { RegisteredNursingEvent } from '../events/resgistered-nursing.event';
import { RegisteredNursingEventDto } from '../dto/registered-nursing-event.dto';

@Injectable()
export class RegisterNursingSaga {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly outboxOrchestrator: OutboxOrchestratorService,
  ) {}

  @Saga()
  registerNursingSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RegisteredNursingEvent),
      map((event) =>
        this.publishRegisteredNursingEvent(event.registeredNursingEventDto),
      ),
    );
  };

  private async publishRegisteredNursingEvent(
    nursingDto: RegisteredNursingEventDto,
  ): Promise<void> {
    await this.outboxOrchestrator.processEvent(
      'nursing.registered',
      nursingDto,
    );
  }
}
