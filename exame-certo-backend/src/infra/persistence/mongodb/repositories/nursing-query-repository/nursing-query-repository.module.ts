import { Module } from '@nestjs/common';
import { Nursing, NursingSchema } from '../../schemas/nursing.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NursingQueryRepositoryImpl } from './nursing-query.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nursing.name, schema: NursingSchema }]),
  ],
  providers: [
    {
      provide: 'NursingQueryRepository',
      useClass: NursingQueryRepositoryImpl,
    },
  ],
  exports: ['NursingQueryRepository'],
})
export class NursingQueryRepositoryModule {}
