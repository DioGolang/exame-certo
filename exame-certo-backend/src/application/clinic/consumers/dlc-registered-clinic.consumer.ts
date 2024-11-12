import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class DlcRegisteredClinicConsumer {
  @RabbitSubscribe({
    exchange: 'dlx_exchange',
    routingKey: 'clinic.registered.dlq',
    queue: 'clinic_dlq',
  })
  async handle(msg: any) {
    try {
      console.log('Evento reprocessado com sucesso!');
    } catch (e) {
      console.error('erro ao reprocessar evento:', e);
    }
  }
}
