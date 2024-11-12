import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export const rabbitMQConfig: RabbitMQConfig = {
  exchanges: [
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
  connectionInitOptions: { wait: true, timeout: 30000 },
  channels: { 'channel-1': { prefetchCount: 5, default: true } },
  queues: [
    {
      name: 'patient_registered_queue',
      options: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': 'dlx_exchange',
          'x-dead-letter-routing-key': 'patient.registered.dlq',
        },
      },
    },
    {
      name: 'patient_dlq',
      options: {
        durable: true,
      },
    },
    {
      name: 'attendant_registered_queue',
      options: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': 'dlx_exchange',
          'x-dead-letter-routing-key': 'attendant.registered.dlq',
        },
      },
    },
    {
      name: 'clinic_registered_queue',
      options: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': 'dlx_exchange',
          'x-dead-letter-routing-key': 'clinic.registered.dlq',
        },
      },
    },
    {
      name: 'doctor_registered_queue',
      options: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': 'dlx_exchange',
          'x-dead-letter-routing-key': 'doctor.registered.dlq',
        },
      },
    },
    {
      name: 'nursing_registered_queue',
      options: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': 'dlx_exchange',
          'x-dead-letter-routing-key': 'nursing.registered.dlq',
        },
      },
    },
  ],
};
