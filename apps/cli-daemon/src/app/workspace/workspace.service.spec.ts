import { Test, TestingModule } from '@nestjs/testing';

import { createSessionServiceMock } from '../../../testing';
import { SessionService } from '../session/session.service';

import { WorkspaceService } from './workspace.service';

describe('WorkspaceSettingsService', () => {
  let service: WorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceService,
        {
          provide: SessionService,
          useValue: createSessionServiceMock(),
        },
      ],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
