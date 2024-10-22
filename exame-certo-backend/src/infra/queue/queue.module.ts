import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { bullMqConfig } from '../config/bullMqConfig';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';

@Global()
@Module({
  imports: [
    BullModule.forRoot(bullMqConfig),
    BullModule.registerQueue({
      name: 'outbox-queue',
    }),
    BullModule.registerFlowProducer({
      name: 'producerOutbox',
    }),
  ],
  providers: [QueueService, QueueProcessor],
  exports: [QueueService, QueueProcessor],
})
export class QueueModule {}
