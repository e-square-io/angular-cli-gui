import { Routes } from '@angular/router';

import { currentWorkspaceGuard } from './guards/current-workspace.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    canActivate: [currentWorkspaceGuard],
    children: [
      {
        path: 'generators',
        loadComponent: () =>
          import('@angular-cli-gui/generators').then(
            (m) => m.GeneratorsComponent
          ),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('@angular-cli-gui/configuration').then(
            (m) => m.ConfigurationComponent
          ),
      },
      {
        path: 'executors',
        loadComponent: () =>
          import('@angular-cli-gui/executors').then(
            (m) => m.ExecutorsComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'generators',
      },
    ],
  },
  {
    path: 'workspace-manager',
    loadChildren: () =>
      import('@angular-cli-gui/workspace-manager').then(
        (m) => m.WORKSPACE_MANAGER_ROUTES
      ),
  },
];
