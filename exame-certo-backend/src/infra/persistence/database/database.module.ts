import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './typeorm/type-orm-config.module';
import { MongodbConfigModule } from './mongodb/mongodb-config/mongodb-config.module';

@Module({
  imports: [TypeOrmConfigModule, MongodbConfigModule],
})
export class DatabaseModule {}
