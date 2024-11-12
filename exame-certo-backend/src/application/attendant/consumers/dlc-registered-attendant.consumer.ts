import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class DlcRegisteredAttendantConsumer {
  @RabbitSubscribe({
    exchange: 'dlx_exchange',
    routingKey: 'attendant.registered.dlq',
    queue: 'attendant_dlq',
  })
  async handle(msg: any) {
    try {
      console.log('Evento reprocessado com sucesso!');
    } catch (e) {
      console.error('erro ao reprocessar evento:', e);
    }
  }
}
