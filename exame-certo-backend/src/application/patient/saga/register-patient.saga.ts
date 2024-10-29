import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterPatientSaga {
  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  registerPatientSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe();
  };
}
