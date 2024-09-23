import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from '../../config/rabbitmq.config';
import { RabbitmqService } from './rabbitmq.service';

@Global()
@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, rabbitMQConfig)],
  providers: [RabbitmqService],
  exports: [RabbitMQModule, RabbitmqService],
})
export class RabbitmqModule {}
