import { Module } from '@nestjs/common';
import { Mappers } from './mappers';
import { ValidatorsModule } from './validators/validators.module';
import { OutboxModule } from './services/outbox/outbox.module';

@Module({
  imports: [ValidatorsModule, OutboxModule],
  providers: [...Mappers],
  exports: [...Mappers],
})
export class SharedModule {}
