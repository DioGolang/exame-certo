import { Test, TestingModule } from '@nestjs/testing';
import { AttendantController } from './attendant.controller';

describe('ControllersController', () => {
  let controller: AttendantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendantController],
    }).compile();

    controller = module.get<AttendantController>(AttendantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
