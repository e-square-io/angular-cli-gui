import fs from 'fs/promises';
import os from 'os';

import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { createWorkspaceHost } from '@angular-devkit/core/src/workspace';
import { readWorkspace as devKitReadWorkspace } from '@angular-devkit/core/src/workspace/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isDefined } from 'class-validator';


import { DirectoryDto } from './dto/directory.dto';
import { NOT_VALID_PATH_EXCEPTION } from './entities';

@Injectable()
export class WorkspaceManagerService {
  private readonly pathDirectoriesCache = new Map<string, DirectoryDto[]>();

  public async getDirectoriesInPath(
    path: string = this.getHomeDir()
  ): Promise<DirectoryDto[]> {
    const cachedPathDirectories: DirectoryDto[] | undefined =
      this.pathDirectoriesCache.get(path);

    if (isDefined(cachedPathDirectories)) {
      return cachedPathDirectories as DirectoryDto[];
    }

    try {
      const filesAndDirectories = await fs.readdir(path, {
        withFileTypes: true,
      });
      const directories = await Promise.all(
        filesAndDirectories
          .filter((fileOrFolder) => fileOrFolder.isDirectory())
          .map(
            async (directory) =>
              new DirectoryDto(
                directory.name,
                await this.isAngularWorkspace(directory.name, path)
              )
          )
      );
      this.pathDirectoriesCache.set(path, directories);
      return directories;
    } catch (e) {
      throw new BadRequestException(`${NOT_VALID_PATH_EXCEPTION}: ${path}`);
    }
  }

  public getHomeDir(): string {
    return os.homedir();
  }

  private async isAngularWorkspace(
    directoryName: string,
    path: string
  ): Promise<boolean> {
    const fullPath = `${path}/${directoryName}`;
    try {
      const workspace = await devKitReadWorkspace(
        fullPath,
        createWorkspaceHost(new NodeJsSyncHost())
      );
      return !!workspace;
    } catch (e) {
      return false;
    }
  }
}
