import { Test, TestingModule } from '@nestjs/testing';

import { createExecutorsServiceMock } from '../../../testing';

import { ExecutorsController } from './executors.controller';
import { ExecutorsService } from './executors.service';

describe('ExecutorsController', () => {
  let controller: ExecutorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutorsController],
      providers: [
        { provide: ExecutorsService, useValue: createExecutorsServiceMock() },
      ],
    }).compile();

    controller = module.get<ExecutorsController>(ExecutorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
