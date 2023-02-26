import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';

import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { NOT_VALID_PATH } from './entities';
import { WorkspaceManagerService } from './workspace-manager.service';

const mockDirectory: Partial<Dirent>[] = [
  { name: 'a', isDirectory: () => true },
  { name: 'b', isDirectory: () => false },
];

jest.mock('fs/promises', () => ({
  readdir: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(mockDirectory))),
}));

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

  describe('getDirectory', () => {
    it('Should call fs.readdir', () => {
      service.getDirectory('mock path');
      expect(fs.readdir).toHaveBeenCalledWith('mock path', {
        withFileTypes: true,
      });
    });

    it('Should return list of directories from a provided path', async () => {
      try {
        const directories = await service.getDirectory('mock path');
        expect(directories).toEqual([
          {
            name: 'a',
            isNG: false,
          },
        ]);
      } catch (err) {
        console.log(err);
        expect(err).toEqual(
          new InternalServerErrorException(`${NOT_VALID_PATH}: mock path`)
        );
      }
    });
  });

  describe('getRootDirectory', () => {
    it('Should call getDirectory with file-system root path', async () => {
      try {
        const getDirectorySpy = jest.spyOn(service, 'getDirectory');
        await service.getRootDirectory();
        expect(getDirectorySpy).toHaveBeenCalledWith(
          path.parse(process.cwd()).root
        );
      } catch (err) {
        expect(err).toEqual(
          new InternalServerErrorException(`${NOT_VALID_PATH}: mock path`)
        );
      }
    });
  });
});
