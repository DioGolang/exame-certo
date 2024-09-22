import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export const rabbitMQConfig: RabbitMQConfig = {
  exchanges: [
    {
      name: 'exchange_name',
      type: 'direct', // Tipo do exchange (direct, fanout, topic, etc.)
    },
  ],
  uri: `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
  // connectionInitOptions: { wait: false }, // Inicia imediatamente sem esperar conexão
};