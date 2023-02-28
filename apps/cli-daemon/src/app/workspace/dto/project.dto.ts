import { Project } from '@angular-cli-gui/shared/data';
import { JsonValue } from '@angular-devkit/core';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';

export class ProjectDto implements Project {
  root: string;
  prefix?: string;
  sourceRoot?: string;
  extensions: Record<string, JsonValue | undefined>;

  constructor(projectDefinition: ProjectDefinition) {
    this.root = projectDefinition.root;
    this.prefix = projectDefinition.prefix;
    this.sourceRoot = projectDefinition.sourceRoot;
    this.extensions = projectDefinition.extensions;
  }
}
