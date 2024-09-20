import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { ApplicationMappersModule } from './mappers/application-mappers.module';

@Module({
  imports: [CommandsModule, ApplicationMappersModule],
})
export class ApplicationModule {}
