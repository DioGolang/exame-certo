import { Test, TestingModule } from '@nestjs/testing';
import { ClinicDomainService } from './clinic-domain.service';

describe('ClinicDomainService', () => {
  let service: ClinicDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicDomainService],
    }).compile();

    service = module.get<ClinicDomainService>(ClinicDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
