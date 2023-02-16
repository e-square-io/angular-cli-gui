import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const appRoutes: Routes = [
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
        loadComponent: () => import('@angular-cli-gui/generators').then(m => m.GeneratorsComponent),
      },
      {
        path: 'configuration',
        loadComponent: () => import('@angular-cli-gui/configuration').then(m => m.ConfigurationComponent),
      },
    ],
  },
  {
    path: 'workspace-manager',
    loadChildren: () => import('@angular-cli-gui/workspace-manager').then(m => m.WORKSPACE_MANAGER_ROUTES),
  },
];
