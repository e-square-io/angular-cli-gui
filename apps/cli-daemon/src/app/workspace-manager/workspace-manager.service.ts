import fs from 'fs/promises';
import { parse } from 'path';

import { Directory } from '@angular-cli-gui/shared/data';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { createWorkspaceHost } from '@angular-devkit/core/src/workspace';
import { readWorkspace as devKitReadWorkspace } from '@angular-devkit/core/src/workspace/core';
import { BadRequestException, Injectable } from '@nestjs/common';

import { NOT_VALID_PATH } from './entities';

@Injectable()
export class WorkspaceManagerService {
  public async getDirectory(path: string): Promise<Directory[]> {
    try {
      const filesAndFolders = await fs.readdir(path, { withFileTypes: true });
      const directories = filesAndFolders
        .filter((fileOrFolder) => fileOrFolder.isDirectory())
        .map((directory) => ({ name: directory.name }));

      return this.enrichNgWorkspaceDirectories(directories, path);
    } catch (e) {
      throw new BadRequestException(`${NOT_VALID_PATH}: ${path}`);
    }
  }

  public async getRootDirectory(): Promise<Directory[]> {
    const { root } = parse(process.cwd());
    return this.getDirectory(root);
  }

  private enrichNgWorkspaceDirectories(
    directories: Directory[],
    path: string
  ): Promise<Directory[]> {
    return Promise.all(
      directories.map(async (directory) => {
        return {
          ...directory,
          isNG: await this.isWorkspaceDirectory(directory.name, path),
        };
      })
    );
  }

  private async isWorkspaceDirectory(
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
