import { Module } from '@nestjs/common';
import { MappingService } from './mapping.service';

@Module({
  providers: [MappingService]
})
export class MappingModule {}
