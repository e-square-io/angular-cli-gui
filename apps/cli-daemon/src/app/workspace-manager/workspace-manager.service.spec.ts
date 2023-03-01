import { Dirent } from 'fs';
import fs from 'fs/promises';
import os from 'os';

import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

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

jest.mock('os', () => ({
  homedir: jest.fn().mockReturnValue('home'),
}));

const mockDirectory: Partial<Dirent>[] = [
  { name: 'a', isDirectory: () => true },
  { name: 'b', isDirectory: () => false },
];

describe('WorkspaceManagerService', () => {
  let service: WorkspaceManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceManagerService],
    }).compile();

    service = module.get<WorkspaceManagerService>(WorkspaceManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDirectoriesInPath', () => {
    it('should call fs.readdir', () => {
      service.getDirectoriesInPath('mock path');
      expect(fs.readdir).toHaveBeenCalledWith('mock path', {
        withFileTypes: true,
      });
    });

    it('should return list of directories from a provided path', async () => {
      const directories = await service.getDirectoriesInPath('mock path');
      expect(directories).toEqual([new DirectoryDto('a', false)]);
    });

    it('should call readdir with home directory when not provided a path', async () => {
      await service.getDirectoriesInPath();
      expect(fs.readdir).toHaveBeenCalledWith('home', {
        withFileTypes: true,
      });
    });

    it('should throw BadRequestException when called with invalid path', async () => {
      try {
        await service.getDirectoriesInPath('error path');
      } catch (err) {
        expect(err).toEqual(
          new BadRequestException(`${NOT_VALID_PATH_EXCEPTION}: error path`)
        );
      }
    });
  });

  describe('getHomeDir', () => {
    it('should call os.homedir', () => {
      service.getHomeDir();
      expect(os.homedir).toHaveBeenCalled();
    });

    it('should return the homedir path', () => {
      const homedir = service.getHomeDir();
      expect(homedir).toMatch('home');
    });
  });
});
