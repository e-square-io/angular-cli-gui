import { Test, TestingModule } from '@nestjs/testing';

import { createSessionServiceMock } from '../../../testing';
import { SessionService } from '../session/session.service';

import { ExecutorsService } from './executors.service';

describe('ExecutorsService', () => {
  let service: ExecutorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExecutorsService,
        { provide: SessionService, useValue: createSessionServiceMock() },
      ],
    }).compile();

    service = module.get<ExecutorsService>(ExecutorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
