import { NodeJsSyncHost } from '@angular-devkit/core/node';
import {
  createWorkspaceHost,
  // writeWorkspace,
  readWorkspace as devKitReadWorkspace,
  ProjectDefinition,
  TargetDefinition,
  WorkspaceDefinition,
} from '@angular-devkit/core/src/workspace';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { SessionService } from '../session/session.service';

export const BAD_PATH_EXCEPTION =
  'Unable to determine format for workspace path.';
export const NOT_ANGULAR_WORKSPACE =
  'Unable to locate a workspace file for workspace path. Are you missing an `angular.json`' +
  ' or `.angular.json` file?';

@Injectable()
export class WorkspaceService {
  private readonly logger = new Logger(WorkspaceService.name);

  constructor(private readonly sessionService: SessionService) {}

  async readWorkspace(path: string): Promise<WorkspaceDefinition> {
    try {
      return (
        await devKitReadWorkspace(
          path,
          createWorkspaceHost(new NodeJsSyncHost())
        )
      ).workspace;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err['message'];
      switch (errorMessage) {
        case BAD_PATH_EXCEPTION:
          throw new BadRequestException(BAD_PATH_EXCEPTION);
        case NOT_ANGULAR_WORKSPACE:
          throw new NotFoundException('Angular workspace not found.');
        default:
          this.logger.error(errorMessage);
          throw new InternalServerErrorException(err);
      }
    }
  }

  async readWorkspaceProjectNames(): Promise<string[]> {
    const workspace = await this.readWorkspace(this.sessionService.cwd);

    return Array.from(workspace.projects.keys());
  }

  async readWorkspaceProject(
    name: string
  ): Promise<ProjectDefinition | undefined> {
    const workspace = await this.readWorkspace(this.sessionService.cwd);

    return workspace?.projects?.get(name);
  }

  async readWorkspaceProjectTargetNames(name: string): Promise<string[]> {
    const project = await this.readWorkspaceProject(name);

    if (!project?.targets?.size) {
      return [];
    }

    return Array.from(project.targets.keys());
  }

  async readWorkspaceProjectTarget(
    projectName: string,
    targetName: string
  ): Promise<TargetDefinition | undefined> {
    const project = await this.readWorkspaceProject(projectName);

    return project?.targets.get(targetName);
  }
}
