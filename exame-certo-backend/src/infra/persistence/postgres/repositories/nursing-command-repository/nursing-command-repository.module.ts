import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NursingEntity } from '../../entities/nursing.entity';
import { NursingCommandRepositoryImpl } from './nursing-command.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NursingEntity])],
  providers: [
    {
      provide: 'NursingCommandRepository',
      useClass: NursingCommandRepositoryImpl,
    },
  ],
  exports: ['NursingCommandRepository'],
})
export class NursingCommandRepositoryModule {}
