import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { WorkspaceSettingsService } from './workspace-settings.service';

describe('WorkspaceSettingsService', () => {
  let service: WorkspaceSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceSettingsService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn(), set: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<WorkspaceSettingsService>(WorkspaceSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
