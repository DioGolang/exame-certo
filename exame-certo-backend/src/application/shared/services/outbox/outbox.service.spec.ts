import { Test, TestingModule } from '@nestjs/testing';
import { OutboxApplicationService } from './outbox-application.service';

describe('OutboxService', () => {
  let service: OutboxApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutboxApplicationService],
    }).compile();

    service = module.get<OutboxApplicationService>(OutboxApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
