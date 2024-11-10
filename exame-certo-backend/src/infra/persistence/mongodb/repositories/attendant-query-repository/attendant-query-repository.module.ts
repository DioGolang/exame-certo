import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendant, AttendantSchema } from '../../schemas/attendant.schema';
import { AttendantQueryRepositoryImpl } from './attendant-query.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendant.name, schema: AttendantSchema },
    ]),
  ],
  providers: [
    {
      provide: 'AttendantQueryRepository',
      useClass: AttendantQueryRepositoryImpl,
    },
  ],
  exports: ['AttendantQueryRepository'],
})
export class AttendantQueryRepositoryModule {}
