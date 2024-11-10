import { Test, TestingModule } from '@nestjs/testing';
import { NursingDomainService } from './nursing-domain.service';

describe('NursingService', () => {
  let service: NursingDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NursingDomainService],
    }).compile();

    service = module.get<NursingDomainService>(NursingDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
