import { Module } from '@nestjs/common';
import { UuidGeneratorService } from './uuid-generator.service';

@Module({
  providers: [
    {
      provide: 'UuidGenerator',
      useClass: UuidGeneratorService,
    },
  ],
  exports: ['UuidGenerator'],
})
export class UuidModule {}
