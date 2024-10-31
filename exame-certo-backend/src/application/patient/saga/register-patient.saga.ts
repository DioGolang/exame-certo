import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { RegisteredPatientEvent } from '../events/registered-patient.event';
import { OutboxOrchestratorService } from '../../shared/services/outbox/outbox-orchestrator.service';
import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';

@Injectable()
export class RegisterPatientSaga {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly outboxOrchestrator: OutboxOrchestratorService,
  ) {}

  @Saga()
  registerPatientSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RegisteredPatientEvent),
      map((event) =>
        this.publishRegisteredPatientEvent(event.registeredPatientEventDto),
      ),
    );
  };

  private async publishRegisteredPatientEvent(
    patientDto: RegisteredPatientEventDto,
  ): Promise<void> {
    await this.outboxOrchestrator.processEvent(
      'patient.registered',
      patientDto,
    );
  }
}
