import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class DlcRegisteredConsumer {
  @RabbitSubscribe({
    exchange: 'dlx_exchange',
    routingKey: 'doctor.registered.dlq',
    queue: 'doctor_dlq',
  })
  async handle(msg: any) {
    try {
      console.log('Evento reprocessado com sucesso!');
    } catch (e) {
      console.error('erro ao reprocessar evento:', e);
    }
  }
}
