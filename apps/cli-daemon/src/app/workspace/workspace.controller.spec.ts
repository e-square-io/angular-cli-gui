import { Test, TestingModule } from '@nestjs/testing';

import { createSessionServiceMock } from '../../../testing';
import { GeneratorsService } from '../generators/generators.service';
import { SessionService } from '../session/session.service';

import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

describe('WorkspaceSettingsController', () => {
  let controller: WorkspaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceController],
      providers: [
        {
          provide: GeneratorsService,
          useValue: {
            execSync: jest.fn(),
          },
        },
        {
          provide: WorkspaceService,
          useValue: {
            readWorkspaceProject: jest.fn(),
            readWorkspace: jest.fn(),
            readWorkspaceProjectNames: jest.fn(),
            readWorkspaceProjectTarget: jest.fn(),
            readWorkspaceProjectTargetNames: jest.fn(),
          },
        },
        {
          provide: SessionService,
          useValue: createSessionServiceMock(),
        },
      ],
    }).compile();

    controller = module.get<WorkspaceController>(WorkspaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
