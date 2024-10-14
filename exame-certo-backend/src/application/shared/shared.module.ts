import { Module } from '@nestjs/common';
import { Mappers } from './mappers';
import { ValidatorsModule } from './validators/validators.module';

@Module({
  imports: [ValidatorsModule],
  providers: [...Mappers],
  exports: [...Mappers],
})
export class SharedModule {}
