import { Module } from '@nestjs/common';
import { BuildersModule } from './builders/builders.module';

@Module({
  imports: [BuildersModule],
})
export class DomainModule {}
