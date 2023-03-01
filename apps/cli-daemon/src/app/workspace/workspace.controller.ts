import { TargetDefinition } from '@angular-devkit/core/src/workspace';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ExecResult } from '../generators/dto';
import { GeneratorsService } from '../generators/generators.service';
import { CREATE_WORKSPACE_COMMAND } from '../ng-commands';
import { SessionService } from '../session/session.service';

import { ProjectDto, UpdateProjectDto, WorkspaceConnectDto } from './dto';
import { WorkspaceCreateDto } from './dto/workspace-create.dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  private readonly logger = new Logger(WorkspaceController.name);

  constructor(
    private readonly sessionService: SessionService,
    private readonly workspaceService: WorkspaceService,
    private readonly generatorsService: GeneratorsService
  ) {}

  @Post('connect')
  async connect(@Body() body: WorkspaceConnectDto): Promise<void> {
    await this.workspaceService.connect(body.path);
  }

  @Post('create')
  create(@Body() body: WorkspaceCreateDto): ExecResult {
    try {
      this.sessionService.setCwd(body.path);
      // TODO using execSync is just for DEMO purposes, should be replaced with execAsync as soon as
      //  it's implemented
      return this.generatorsService.execSync(
        this.ngNewArgsFromDto(body),
        CREATE_WORKSPACE_COMMAND
      );
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Get('workspace-path')
  getCurrentWorkspacePath(): { path: string } {
    return { path: this.sessionService.cwd };
  }

  @Get('project-names')
  getWorkspaceProjectNames(): Promise<string[]> {
    return this.workspaceService.readWorkspaceProjectNames();
  }

  @Get('project/:projectName')
  async getProject(
    @Param('projectName') projectName: string
  ): Promise<ProjectDto> {
    return this.workspaceService.readWorkspaceProject(projectName);
  }

  @Patch('project/:projectName')
  async updateProject(
    @Param('projectName') projectName: string,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<ProjectDto> {
    return await this.workspaceService.updateWorkspaceProject(
      projectName,
      updateProjectDto
    );
  }

  @Get('project/:projectName/target-names')
  getProjectTargetNames(
    @Param('projectName') projectName: string
  ): Promise<string[]> {
    return this.workspaceService.readWorkspaceProjectTargetNames(projectName);
  }

  @Get('project/:projectName/target/:targetName')
  async getProjectTarget(
    @Param('projectName') projectName: string,
    @Param('targetName') targetName: string
  ): Promise<TargetDefinition> {
    return await this.workspaceService.readWorkspaceProjectTarget(
      projectName,
      targetName
    );
  }

  private ngNewArgsFromDto({ name, options }: WorkspaceCreateDto): string[] {
    const args: string[] = [name];

    const ngNewOptions = options.map((option) => {
      // If the option value is undefined, assume it's a boolean flag and include only the option name
      const optionValue = option.value !== undefined ? ` ${option.value}` : '';

      // If the option is interactive, set it to false
      if (option.name === '--interactive') {
        return `--interactive=false`;
      }

      // Otherwise, include the option name and value (if any)
      return `${option.name}${optionValue}`;
    });

    return args.concat(ngNewOptions);
  }
}
