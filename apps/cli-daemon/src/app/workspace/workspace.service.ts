import { NodeJsSyncHost } from '@angular-devkit/core/node';
import {
  createWorkspaceHost,
  readWorkspace as devKitReadWorkspace,
  writeWorkspace as devKitWriteWorkspace,
  ProjectDefinition,
  TargetDefinition,
  WorkspaceDefinition,
} from '@angular-devkit/core/src/workspace';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { SessionService } from '../session/session.service';

import { ProjectDto, UpdateProjectDto } from './dto';
import {
  ANGULAR_WORKSPACE_NOT_FOUND_EXCEPTION,
  BAD_PATH_EXCEPTION,
  NOT_ANGULAR_WORKSPACE_EXCEPTION,
} from './entities';

const ANGULAR_JSON = '/angular.json';

@Injectable()
export class WorkspaceService {
  private readonly logger = new Logger(WorkspaceService.name);
  private readonly nodeJsSyncHost = new NodeJsSyncHost();

  constructor(private sessionService: SessionService) {}

  async isAngularWorkspace(path: string): Promise<boolean> {
    try {
      return !!(await devKitReadWorkspace(
        path,
        createWorkspaceHost(this.nodeJsSyncHost)
      ));
    } catch {
      return false;
    }
  }

  async connect(path: string): Promise<void> {
    try {
      await devKitReadWorkspace(path, createWorkspaceHost(this.nodeJsSyncHost));
      this.sessionService.setCwd(path);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw this.handleReadWorkspaceException(err);
    }
  }

  async readWorkspaceProjectNames(): Promise<string[]> {
    const workspaceDefinition = await this.readWorkspaceDefinition();

    return Array.from(workspaceDefinition.projects.keys());
  }

  async readWorkspaceProject(name: string): Promise<ProjectDto> {
    return new ProjectDto(await this.readProjectDefinition(name));
  }

  async updateWorkspaceProject(
    name: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<ProjectDto> {
    const workspaceDefinition = await this.readWorkspaceDefinition();
    const projectDefinition = workspaceDefinition.projects.get(name);

    if (!projectDefinition) {
      throw new NotFoundException(`Project ${name} not found`);
    }

    Object.assign(projectDefinition, updateProjectDto);
    await this.writeWorkspace(workspaceDefinition);

    return this.readWorkspaceProject(name);
  }

  async readWorkspaceProjectTargetNames(name: string): Promise<string[]> {
    const projectDefinition = await this.readProjectDefinition(name);

    if (!projectDefinition?.targets?.size) {
      return [];
    }

    return Array.from(projectDefinition.targets.keys());
  }

  async readWorkspaceProjectTarget(
    projectName: string,
    targetName: string
  ): Promise<TargetDefinition> {
    const projectDefinition = await this.readProjectDefinition(projectName);
    const targetDefinition = projectDefinition.targets.get(targetName);

    if (!targetDefinition) {
      throw new NotFoundException(`Target ${targetName} not found`);
    }

    return targetDefinition;
  }

  private async readWorkspaceDefinition(): Promise<WorkspaceDefinition> {
    try {
      return (
        await devKitReadWorkspace(
          this.sessionService.cwd,
          createWorkspaceHost(this.nodeJsSyncHost)
        )
      ).workspace;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw this.handleReadWorkspaceException(err);
    }
  }

  private async writeWorkspace(
    workspaceDefinition: WorkspaceDefinition
  ): Promise<void> {
    await devKitWriteWorkspace(
      workspaceDefinition,
      createWorkspaceHost(this.nodeJsSyncHost),
      `${this.sessionService.cwd}${ANGULAR_JSON}`
    );
  }

  private async readProjectDefinition(
    name: string
  ): Promise<ProjectDefinition> {
    const workspaceDefinition = await this.readWorkspaceDefinition();
    const projectDefinition = workspaceDefinition.projects.get(name);

    if (!projectDefinition) {
      throw new NotFoundException(`Project ${name} not found`);
    }

    return projectDefinition;
  }

  private handleReadWorkspaceException(err: {
    message: string;
  }): HttpException {
    const errorMessage = err['message'];
    switch (errorMessage) {
      case BAD_PATH_EXCEPTION:
        return new BadRequestException(BAD_PATH_EXCEPTION);
      case NOT_ANGULAR_WORKSPACE_EXCEPTION:
        return new NotFoundException(ANGULAR_WORKSPACE_NOT_FOUND_EXCEPTION);
      default:
        this.logger.error(errorMessage);
        return new InternalServerErrorException(err);
    }
  }
}
