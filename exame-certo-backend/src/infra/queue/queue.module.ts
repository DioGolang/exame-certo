import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { bullMqConfig } from '../config/bullMqConfig';

@Module({
  imports: [BullModule.forRoot(bullMqConfig)],
  providers: [],
  exports: [],
})
export class QueueModule {}
