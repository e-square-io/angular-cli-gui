import { Routes } from '@angular/router';

import { WorkspaceManagerComponent } from './workspace-manager.component';

export const WORKSPACE_MANAGER_ROUTES: Routes = [
  {
    path: '',
    component: WorkspaceManagerComponent,
    children: [
      {
        path: '',
        redirectTo: 'workspaces-list',
        pathMatch: 'full',
      },
      {
        path: 'workspaces-list',
        loadComponent: () =>
          import('../workspaces-list/workspaces-list.component').then(
            (m) => m.WorkspacesListComponent
          ),
      },

      {
        path: 'create-workspace',
        loadComponent: () =>
          import('../create-workspace/create-workspace.component').then(
            (m) => m.CreateWorkspaceComponent
          ),
      },
      {
        path: 'connect-workspace',
        loadComponent: () =>
          import('../connect-workspace/connect-workspace.component').then(
            (m) => m.ConnectWorkspaceComponent
          ),
      },
    ],
  },
];
