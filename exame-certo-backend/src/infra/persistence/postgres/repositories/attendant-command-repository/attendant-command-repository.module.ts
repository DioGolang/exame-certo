import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendantEntity } from '../../entities/attendant.entity';
import { AttendantCommandRepositoryImpl } from './attendant-command.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttendantEntity])],
  providers: [
    {
      provide: 'AttendantCommandRepository',
      useClass: AttendantCommandRepositoryImpl,
    },
  ],
  exports: ['AttendantCommandRepository'],
})
export class AttendantCommandRepositoryModule {}
