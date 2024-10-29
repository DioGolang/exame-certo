import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class DlcRegisteredPatientConsumer {
  @RabbitSubscribe({
    exchange: 'dlx_exchange',
    routingKey: 'patient.registered.dlq',
    queue: 'patient_dlq',
  })
  async handle(msg: any) {
    try {
      console.log('Evento reprocessado com sucesso!');
    } catch (e) {
      console.error('erro ao reprocessar evento:', e);
      // envia alerta ou escalona o problema
    }
  }
}
