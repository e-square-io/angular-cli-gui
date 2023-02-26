import { Test, TestingModule } from '@nestjs/testing';

import { WorkspaceManagerController } from './workspace-manager.controller';
import { WorkspaceManagerService } from './workspace-manager.service';

type WorkspaceManagerServiceMock = Record<
  keyof WorkspaceManagerService,
  jest.Mock
>;
const workspaceManagerMock: WorkspaceManagerServiceMock = {
  getDirectory: jest.fn(),
  getRootDirectory: jest.fn(),
};

describe('WorkspaceManagerController', () => {
  let controller: WorkspaceManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceManagerController],
      providers: [
        { provide: WorkspaceManagerService, useValue: workspaceManagerMock },
      ],
    }).compile();

    controller = module.get<WorkspaceManagerController>(
      WorkspaceManagerController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDirectory', () => {
    it('Should call workspaceManagerService.getDirectory when path arg provided', async () => {
      await controller.getDirectory('abc');
      expect(workspaceManagerMock.getDirectory).toHaveBeenCalledWith('abc');
    });
    it('Should call workspaceManagerService.getRootDirectory when path arg not provided', async () => {
      await controller.getDirectory('');
      expect(workspaceManagerMock.getRootDirectory).toHaveBeenCalled();
    });
  });
});
