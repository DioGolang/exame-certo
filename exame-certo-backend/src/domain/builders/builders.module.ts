import { Module } from '@nestjs/common';
import { DefaultBuilderFactory } from './default-builder.factory';

@Module({
  providers: [
    {
      provide: 'BuilderFactory',
      useClass: DefaultBuilderFactory,
    },
  ],
  exports: ['BuilderFactory'],
})
export class BuildersModule {}
