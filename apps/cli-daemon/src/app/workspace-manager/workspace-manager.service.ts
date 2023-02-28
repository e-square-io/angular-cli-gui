import fs from 'fs/promises';

import { Directory } from '@angular-cli-gui/shared/data';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { createWorkspaceHost } from '@angular-devkit/core/src/workspace';
import { readWorkspace as devKitReadWorkspace } from '@angular-devkit/core/src/workspace/core';
import { BadRequestException, Injectable } from '@nestjs/common';

import { SessionService } from '../session/session.service';

import { NOT_VALID_PATH_EXCEPTION } from './entities';

@Injectable()
export class WorkspaceManagerService {
  constructor(private sessionService: SessionService) {}

  public async getDirectoriesInPath(
    path: string = this.sessionService.cwd
  ): Promise<Directory[]> {
    try {
      const filesAndDirectories = await fs.readdir(path, {
        withFileTypes: true,
      });
      return Promise.all(
        filesAndDirectories
          .filter((fileOrFolder) => fileOrFolder.isDirectory())
          .map(async (directory) => ({
            name: directory.name,
            isNG: await this.isAngularWorkspace(directory.name, path),
          }))
      );
    } catch (e) {
      throw new BadRequestException(`${NOT_VALID_PATH_EXCEPTION}: ${path}`);
    }
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
