import { Test, TestingModule } from '@nestjs/testing';
import { NursingController } from './nursing.controller';

describe('ControllersController', () => {
  let controller: NursingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NursingController],
    }).compile();

    controller = module.get<NursingController>(NursingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
