import { Test, TestingModule } from '@nestjs/testing';
import { DoctorDomainService } from './doctor-domain.service';

describe('DoctorDomainService', () => {
  let service: DoctorDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorDomainService],
    }).compile();

    service = module.get<DoctorDomainService>(DoctorDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
