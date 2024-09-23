import { Injectable } from '@nestjs/common';
import { RabbitmqService } from '../../../infra/messaging/rabbitmq/rabbitmq.service';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { CreateClinicEvent } from '../events/create-clinic.event';
import { tap, Observable } from 'rxjs';

@Injectable()
export class ClinicSaga {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  // @Saga()
  // clinicCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(CreateClinicEvent),
  //     tap((event) => {
  //       try {
  //         this.rabbitmqService.publish(
  //           'new_clinic_exchange',
  //           'clinic.created',
  //           event,
  //         );
  //       } catch (error) {
  //         console.error('Erro no Saga de ClinicCreatedEvent:', error);
  //       }
  //     }),
  //   );
  // };
}
