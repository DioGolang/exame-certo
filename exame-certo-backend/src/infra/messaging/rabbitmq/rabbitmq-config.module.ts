import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from '../../config/rabbitmq.config';

@Global()
@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, rabbitMQConfig)],
  exports: [RabbitMQModule],
})
export class RabbitmqConfigModule {}
