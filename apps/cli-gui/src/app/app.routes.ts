import { Routes } from '@angular/router';


export const APP_ROUTES: Routes = [
  {
    path: '',
    title: 'Home',
    // canActivate: [currentWorkspaceGuard],
    children: [
      {
        path: '',
        redirectTo: 'generators',
        pathMatch: 'full',
      },
      {
        path: 'generators',
        loadChildren: () => import('./generators/generators.routes'),
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
    ],
  },
  {
    path: 'workspace-manager',
    title: 'Workspace Manager',
    loadChildren: () =>
      import('@angular-cli-gui/workspace-manager').then(
        (m) => m.WORKSPACE_MANAGER_ROUTES
      ),
  },
];
