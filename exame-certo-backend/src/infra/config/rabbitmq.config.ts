import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export const rabbitMQConfig: RabbitMQConfig = {
  exchanges: [
    {
      name: 'new_clinic_exchange',
      type: 'direct',
    },
    {
      name: 'events_exchange',
      type: 'direct',
    },
    {
      name: 'dlx_exchange',
      type: 'topic',
    },
  ],
  uri: `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
  connectionInitOptions: { wait: true, timeout: 10000 },
  channels: { 'channel-1': { prefetchCount: 5, default: true } },
  queues: [
    {
      name: 'patient_registered_queue',
      options: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': 'dlx_exchange',
        },
      },
    },
    {
      name: 'patient_dlq',
      options: {
        durable: true,
      },
    },
  ],
};
