import { Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
