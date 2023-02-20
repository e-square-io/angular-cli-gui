import {
  ProjectDefinition,
  TargetDefinition,
} from '@angular-devkit/core/src/workspace';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { SessionService } from '../session/session.service';

import { WorkspaceConnectDto } from './dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  private readonly logger = new Logger(WorkspaceController.name);

  constructor(
    private readonly sessionService: SessionService,
    private readonly workspaceService: WorkspaceService
  ) {}

  @Post('connect')
  async connect(@Body() body: WorkspaceConnectDto): Promise<void> {
    const path = body.path;
    await this.workspaceService.readWorkspace(path);
    this.sessionService.setCwd(path);
  }

  @Get('workspace-path')
  getCurrentWorkspacePath(): { path: string } {
    return { path: this.sessionService.cwd };
  }

  @Get()
  getWorkspaceProjectNames(): Promise<string[]> {
    return this.workspaceService.readWorkspaceProjectNames();
  }

  @Get(':projectName')
  async getProject(
    @Param('projectName') projectName: string
  ): Promise<ProjectDefinition> {
    let project: ProjectDefinition | undefined;

    try {
      project = await this.workspaceService.readWorkspaceProject(projectName);
    } catch (err) {
      this.logger.error(err);

      throw new InternalServerErrorException();
    }

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @Get(':projectName/target-names')
  getProjectTargetNames(
    @Param('projectName') projectName: string
  ): Promise<string[]> {
    try {
      return this.workspaceService.readWorkspaceProjectTargetNames(projectName);
    } catch (err) {
      this.logger.error(err);

      throw new InternalServerErrorException();
    }
  }

  @Get(':projectName/target/:targetName')
  async getProjectTarget(
    @Param('projectName') projectName: string,
    @Param('targetName') targetName: string
  ): Promise<TargetDefinition> {
    let target: TargetDefinition | undefined;

    try {
      target = await this.workspaceService.readWorkspaceProjectTarget(
        projectName,
        targetName
      );
    } catch (err) {
      this.logger.error(err);

      throw new InternalServerErrorException();
    }

    if (!target) {
      throw new NotFoundException();
    }

    return target;
  }
}
