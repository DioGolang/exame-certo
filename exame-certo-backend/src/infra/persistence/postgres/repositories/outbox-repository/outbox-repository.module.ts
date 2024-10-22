import { Global, Module } from '@nestjs/common';
import { OutboxRepositoryImpl } from './outbox.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboxEntity } from '../../entities/outbox.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([OutboxEntity])],
  providers: [
    {
      provide: 'OutboxRepository',
      useClass: OutboxRepositoryImpl,
    },
  ],
  exports: ['OutboxRepository', TypeOrmModule],
})
export class OutboxRepositoryModule {}
