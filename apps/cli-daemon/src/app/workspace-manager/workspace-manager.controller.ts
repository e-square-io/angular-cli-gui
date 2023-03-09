import path from 'path';

import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';

import { DirectoryDto } from './dto/directory.dto';
import { WorkspaceManagerService } from './workspace-manager.service';

@Controller('workspace-manager')
export class WorkspaceManagerController {
  constructor(
    private readonly workspaceManagerService: WorkspaceManagerService
  ) {}

  @Get('dir')
  public async getDirectory(
    @Query('path') path: string
  ): Promise<DirectoryDto[]> {
    try {
      return this.workspaceManagerService.getDirectoriesInPath(path);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Get('homedir')
  public getHomeDirectory(): string {
    return this.workspaceManagerService.getHomeDir();
  }

  @Get('path-sep')
  public getPathSeparator(): string {
    return path.sep;
  }
}
