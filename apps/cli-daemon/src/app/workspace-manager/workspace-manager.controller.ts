import { Directory } from '@angular-cli-gui/shared/data';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';

import { WorkspaceManagerService } from './workspace-manager.service';

@Controller('workspace-manager')
export class WorkspaceManagerController {
  constructor(
    private readonly workspaceManagerService: WorkspaceManagerService
  ) {}

  @Get('dir?:path')
  public async getDirectory(@Query('path') path: string): Promise<Directory[]> {
    try {
      return this.workspaceManagerService.getDirectoriesInPath(path);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
