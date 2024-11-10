import { Test, TestingModule } from '@nestjs/testing';
import { AttendantDomainService } from './attendant-domain.service';

describe('AttendantService', () => {
  let service: AttendantDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendantDomainService],
    }).compile();

    service = module.get<AttendantDomainService>(AttendantDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
