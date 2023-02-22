import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'generators',
        pathMatch: 'full',
      },
      {
        path: 'generators',
        loadChildren: () =>
          import('./generators/generators.routes').then(
            (m) => m.GENERATOR_ROUTES
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
