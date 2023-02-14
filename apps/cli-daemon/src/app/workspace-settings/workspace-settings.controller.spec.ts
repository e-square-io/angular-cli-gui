import { Test, TestingModule } from '@nestjs/testing';

import { WorkspaceSettingsController } from './workspace-settings.controller';

describe('WorkspaceSettingsController', () => {
  let controller: WorkspaceSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceSettingsController],
    }).compile();

    controller = module.get<WorkspaceSettingsController>(WorkspaceSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
