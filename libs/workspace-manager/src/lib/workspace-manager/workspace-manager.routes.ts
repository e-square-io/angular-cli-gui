import { Routes } from '@angular/router';
import { WorkspaceManagerComponent } from '@angular-cli-gui/workspace-manager';

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
          import('./features/workspaces-list/workspaces-list.component').then(m => m.WorkspacesListComponent),
      },

      {
        path: 'create-workspace',
        loadComponent: () =>
          import('./features/create-workspace/create-workspace.component').then(m => m.CreateWorkspaceComponent),
      },
      {
        path: 'connect-workspace',
        loadComponent: () =>
          import('./features/connect-workspace/connect-workspace.component').then(m => m.ConnectWorkspaceComponent),
      },
    ],
  },
];
