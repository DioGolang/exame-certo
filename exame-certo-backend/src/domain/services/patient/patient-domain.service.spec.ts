import { Test, TestingModule } from '@nestjs/testing';
import { PatientDomainService } from './patient-domain.service';

describe('PatientDomainService', () => {
  let service: PatientDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientDomainService],
    }).compile();

    service = module.get<PatientDomainService>(PatientDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
