import { Module } from '@nestjs/common';
import { Mappers } from './mappers';

@Module({
  imports: [],
  providers: [...Mappers],
  exports: [...Mappers],
})
export class SharedModule {}
