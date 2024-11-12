import { Injectable } from '@nestjs/common';
import { OutboxOrchestratorService } from '../../shared/services/outbox/outbox-orchestrator.service';
import { CommandBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreateClinicEventDto } from '../../clinic/dto/create-clinic-event.dto';
import { CreateDoctorEvent } from '../events/create-doctor.event';

@Injectable()
export class RegisterDoctorSaga {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly outboxOrchestrator: OutboxOrchestratorService,
  ) {}

  @Saga()
  registerDoctorSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreateDoctorEvent),
      map((event) =>
        this.publishRegisteredDoctorEvent(event.createDoctorEventDto),
      ),
    );
  };
  private async publishRegisteredDoctorEvent(
    doctorDto: CreateClinicEventDto,
  ): Promise<void> {
    await this.outboxOrchestrator.processEvent('doctor.registered', doctorDto);
  }
}
