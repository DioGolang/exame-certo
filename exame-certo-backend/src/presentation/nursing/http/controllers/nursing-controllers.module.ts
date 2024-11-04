import { Module } from '@nestjs/common';
import { NursingController } from './nursing.controller';

@Module({
  controllers: [NursingController]
})
export class NursingControllersModule {}
