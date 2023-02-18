import { Test, TestingModule } from '@nestjs/testing';

import { WorkspaceController } from './workspace-settings.controller';
import { WorkspaceSettingsService } from './workspace-settings.service';

describe('WorkspaceSettingsController', () => {
  let controller: WorkspaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceController],
      providers: [
        {
          provide: WorkspaceSettingsService,
          useValue: {
            readWorkspaceProject: jest.fn(),
            readWorkspace: jest.fn(),
            readWorkspaceProjectNames: jest.fn(),
            readWorkspaceProjectTarget: jest.fn(),
            readWorkspaceProjectTargetNames: jest.fn(),
            WORKSPACE_ROOT: '',
          },
        },
      ],
    }).compile();

    controller = module.get<WorkspaceController>(WorkspaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
