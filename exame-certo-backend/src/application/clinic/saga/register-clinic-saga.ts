import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { CreateClinicEvent } from '../events/create-clinic.event';
import { Observable, map } from 'rxjs';
import { OutboxOrchestratorService } from '../../shared/services/outbox/outbox-orchestrator.service';
import { CreateClinicEventDto } from '../dto/create-clinic-event.dto';

@Injectable()
export class RegisterClinicSaga {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly outboxOrchestrator: OutboxOrchestratorService,
  ) {}

  @Saga()
  registerClinicSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreateClinicEvent),
      map((event) => this.publishCreateClinicEvent(event.createClinicEventDto)),
    );
  };

  private async publishCreateClinicEvent(
    clinicDto: CreateClinicEventDto,
  ): Promise<void> {
    await this.outboxOrchestrator.processEvent('clinic.registered', clinicDto);
  }
}
