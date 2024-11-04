import { Module } from '@nestjs/common';
import { AttendantController } from './attendant.controller';

@Module({
  controllers: [AttendantController]
})
export class AttendantControllersModule {}
