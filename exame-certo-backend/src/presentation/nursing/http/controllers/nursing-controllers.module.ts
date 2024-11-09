import { Module } from '@nestjs/common';
import { NursingController } from './nursing.controller';
import { NursingModule } from '../../../../application/nursing/nursing.module';

@Module({
  imports: [NursingModule],
  controllers: [NursingController],
})
export class NursingControllersModule {}
