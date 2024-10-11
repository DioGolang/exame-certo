import { Module } from '@nestjs/common';
import { UuidModule } from './uuid/uuid.module';

@Module({
  imports: [UuidModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ServicesModule {}
