import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { bullMqConfig } from '../config/bullMqConfig';

@Global()
@Module({
  imports: [
    BullModule.forRoot(bullMqConfig),
    BullModule.registerQueue({
      name: 'outbox-queue',
    }),
  ],
  providers: [],
  exports: [],
})
export class QueueModule {}
