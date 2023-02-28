import { Dirent } from 'fs';
import fs from 'fs/promises';

import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { SessionService } from '../session/session.service';

import { DirectoryDto } from './dto/directory.dto';
import { NOT_VALID_PATH_EXCEPTION } from './entities';
import { WorkspaceManagerService } from './workspace-manager.service';

jest.mock('fs/promises', () => ({
  readdir: jest.fn().mockImplementation(
    (path: string) =>
      new Promise((resolve, reject) => {
        if (path === 'error path') reject('invalid');
        resolve(mockDirectory);
      })
  ),
}));

const mockDirectory: Partial<Dirent>[] = [
  { name: 'a', isDirectory: () => true },
  { name: 'b', isDirectory: () => false },
];

type SessionServiceMock = Partial<Record<keyof SessionService, jest.Mock>>;

describe('WorkspaceManagerService', () => {
  let service: WorkspaceManagerService;
  let sessionServiceMock: SessionServiceMock;

  beforeEach(async () => {
    sessionServiceMock = {
      cwd: jest.fn().mockReturnValue('users/home')(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceManagerService,
        { provide: SessionService, useValue: sessionServiceMock },
      ],
    }).compile();

    service = module.get<WorkspaceManagerService>(WorkspaceManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDirectoriesInPath', () => {
    it('Should call fs.readdir', () => {
      service.getDirectoriesInPath('mock path');
      expect(fs.readdir).toHaveBeenCalledWith('mock path', {
        withFileTypes: true,
      });
    });

    it('Should return list of directories from a provided path', async () => {
      const directories = await service.getDirectoriesInPath('mock path');
      expect(directories).toEqual([new DirectoryDto('a', false)]);
    });

    it('Should call readdir with root path when not provided a path', async () => {
      await service.getDirectoriesInPath();
      expect(fs.readdir).toHaveBeenCalledWith('users/home', {
        withFileTypes: true,
      });
    });

    it('Should throw BadRequestException when called with invalid path', async () => {
      try {
        await service.getDirectoriesInPath('error path');
      } catch (err) {
        expect(err).toEqual(
          new BadRequestException(`${NOT_VALID_PATH_EXCEPTION}: error path`)
        );
      }
    });
  });
});
