import { Module } from '@nestjs/common';
import { AttendantController } from './attendant.controller';
import { AttendantModule } from '../../../../application/attendant/attendant.module';

@Module({
  imports: [AttendantModule],
  controllers: [AttendantController],
})
export class AttendantControllersModule {}
