import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { WorkspaceSettingsService } from '../lib/services';

type WorkspaceSettingsServiceMock = Partial<
  Record<keyof WorkspaceSettingsService, jest.Mock<any, any> | Observable<any>>
>;

export const workspaceConfigurationMock = {
  properties: {
    root: {
      type: 'string',
      description: 'Root of the project files.',
    },
    prefix: {
      type: 'string',
      format: 'html-selector',
      description: 'The prefix to apply to generated selectors.',
    },
    sourceRoot: {
      type: 'string',
      description:
        'The root of the source files, assets and index.html file structure.',
    },
  },
  title: 'Angular CLI Workspace Configuration',
  description: 'Browser target options',
};

export const workspaceNamesMock = ['name'];

export const workspaceProjectMock = {
  root: 'root',
  prefix: 'prefix',
  sourceRoot: 'sourceRoot',
  extensions: {
    projectType: 'application',
    schematics: {
      '@schematics/angular:component': {
        style: 'scss',
      },
    },
  },
};

export function createWorkspaceSettingsServiceMockk(): WorkspaceSettingsServiceMock {
  return {
    readWorkspaceProject: jest.fn(
      () => new BehaviorSubject(workspaceProjectMock)
    ),
    readWorkspaceProjectNames: jest.fn(
      () => new BehaviorSubject(workspaceNamesMock)
    ),
    readWorkspaceProjectConfiguration: jest.fn(
      () => new BehaviorSubject(workspaceConfigurationMock)
    ),
    updateWorkspaceProjectConfiguration: jest.fn(() => new Subject()),
  };
}
