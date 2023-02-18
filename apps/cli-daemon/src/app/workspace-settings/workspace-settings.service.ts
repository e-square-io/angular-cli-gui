import { NodeJsSyncHost } from '@angular-devkit/core/node';
import {
  createWorkspaceHost,
  // writeWorkspace,
  ProjectDefinition,
  readWorkspace,
  TargetDefinition,
  WorkspaceDefinition,
} from '@angular-devkit/core/src/workspace';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WorkspaceSettingsService {
  private readonly WORKSPACE_ROOT = this.configService.get('WORKSPACE_ROOT');

  constructor(private readonly configService: ConfigService) {}

  async readWorkspaceProjectNames(): Promise<string[]> {
    const workspace = await this.readWorkspace();

    return Array.from(workspace.projects.keys());
  }

  async readWorkspaceProject(
    name: string
  ): Promise<ProjectDefinition | undefined> {
    const workspace = await this.readWorkspace();

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

  private async readWorkspace(): Promise<WorkspaceDefinition> {
    return (
      await readWorkspace(
        this.WORKSPACE_ROOT,
        createWorkspaceHost(new NodeJsSyncHost())
      )
    ).workspace;
  }
}
