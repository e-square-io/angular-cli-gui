import { Directory } from '@angular-cli-gui/shared/data';
import { ConnectWorkspaceService } from '@angular-cli-gui/workspace-manager';
import { of } from 'rxjs';

import { WorkspaceManagerApiService } from '../data-access/workspace-manager-api.service';

export const PATH_SEPARATOR_MOCK = '/';
export const HOMEDIR_PATH_MOCK = '/home';
export const DIRECTORIES_MOCK: Directory[] = [
  {
    name: 'dir a',
    isNG: false,
  },
  {
    name: 'dir b',
    isNG: true,
  },
  {
    name: 'dir c',
    isNG: false,
  },
];

export type WorkspaceManagerApiServiceMock = Partial<
  Record<keyof WorkspaceManagerApiService, jest.Mock>
>;

export const getWorkspaceManagerApiServiceMock =
  (): WorkspaceManagerApiServiceMock => {
    return {
      getPathSeparator: jest.fn(() => of(PATH_SEPARATOR_MOCK)),
      getHomeDir: jest.fn(() => of(HOMEDIR_PATH_MOCK)),
      getDirectoriesInPath: jest.fn(() => of(DIRECTORIES_MOCK)),
    };
  };

export type ConnectWorkspaceServiceMock = Partial<
  Record<keyof ConnectWorkspaceService, jest.Mock>
>;

export const getConnectWorkspaceServiceMock =
  (): ConnectWorkspaceServiceMock => {
    return {
      connectWorkspace: jest.fn(() => of(null)),
    };
  };
