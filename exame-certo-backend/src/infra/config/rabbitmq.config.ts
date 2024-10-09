import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export const rabbitMQConfig: RabbitMQConfig = {
  exchanges: [
    {
      name: 'new_clinic_exchange', // Nome do exchange
      type: 'direct', // Tipo do exchange (direct, fanout, topic, etc.)
    },
  ],
  uri: `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
  connectionInitOptions: { wait: true, timeout: 10000 },
};
