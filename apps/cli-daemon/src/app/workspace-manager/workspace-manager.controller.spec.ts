import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { WorkspaceManagerController } from './workspace-manager.controller';
import { WorkspaceManagerService } from './workspace-manager.service';

type WorkspaceManagerServiceMock = Record<
  keyof WorkspaceManagerService,
  jest.Mock
>;
const workspaceManagerMock: WorkspaceManagerServiceMock = {
  getDirectoriesInPath: jest.fn(),
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
    it('should call workspaceManagerService.getDirectoriesInPath', async () => {
      await controller.getDirectory('abc');
      expect(workspaceManagerMock.getDirectoriesInPath).toHaveBeenCalledWith(
        'abc'
      );
    });

    it('should throw InternalServerErrorException when workspaceManagerService.getDirectoriesInPath throws error', async () => {
      workspaceManagerMock.getDirectoriesInPath.mockImplementationOnce(() => {
        throw new Error();
      });
      try {
        await controller.getDirectory('');
      } catch (err) {
        expect(err).toEqual(new InternalServerErrorException());
      }
    });
  });
});
