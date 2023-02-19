import {
  ProjectDefinition,
  TargetDefinition,
} from '@angular-devkit/core/src/workspace';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { WorkspaceSettingsService } from './workspace-settings.service';

@Controller('workspace')
export class WorkspaceController {
  private readonly logger = new Logger(WorkspaceController.name);

  constructor(
    private readonly workspaceSettingsService: WorkspaceSettingsService
  ) {}

  @Get()
  getWorkspaceProjectNames(): Promise<string[]> {
    try {
      return this.workspaceSettingsService.readWorkspaceProjectNames();
    } catch (err) {
      this.logger.error(err);

      throw new InternalServerErrorException();
    }
  }

  @Get(':projectName')
  async getProject(
    @Param('projectName') projectName: string
  ): Promise<ProjectDefinition> {
    let project: ProjectDefinition | undefined;

    try {
      project = await this.workspaceSettingsService.readWorkspaceProject(
        projectName
      );
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
      return this.workspaceSettingsService.readWorkspaceProjectTargetNames(
        projectName
      );
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
      target = await this.workspaceSettingsService.readWorkspaceProjectTarget(
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
