import { Test, TestingModule } from '@nestjs/testing';

import { createSessionServiceMock } from '../../../testing';
import { SessionService } from '../session/session.service';

import { GeneratorsService } from './generators.service';

describe('GeneratorsService', () => {
  let service: GeneratorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneratorsService,
        {
          provide: SessionService,
          useValue: createSessionServiceMock(),
        },
      ],
    }).compile();

    service = module.get<GeneratorsService>(GeneratorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
