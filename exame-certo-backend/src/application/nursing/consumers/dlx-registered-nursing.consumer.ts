import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class DlcRegisteredNursingConsumer {
  @RabbitSubscribe({
    exchange: 'dlx_exchange',
    routingKey: 'nursing.registered.dlq',
    queue: 'nursing_dlq',
  })
  async handle(msg: any) {
    try {
      console.log('Evento reprocessado com sucesso!');
    } catch (e) {
      console.error('erro ao reprocessar evento:', e);
    }
  }
}
