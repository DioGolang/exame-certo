import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitmqService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(
    exchange: string,
    routingKey: string,
    data: any,
  ): Promise<void> {
    await this.amqpConnection.publish(exchange, routingKey, data);
    console.log(
      `Message sent to exchange ${exchange} with routingKey ${routingKey}`,
    );
  }
}
