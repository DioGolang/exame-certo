import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [DomainModule, ApplicationModule, InfraModule, PresentationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
