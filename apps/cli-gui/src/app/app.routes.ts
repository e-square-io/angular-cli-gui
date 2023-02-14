import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'generators',
    loadChildren: () => import('./generators/generators.routes').then(m => m.GENERATOR_ROUTES),
  },
  {
    path: 'workspace-settings',
    loadComponent: () =>
      import('./workspace-settings/workspace-settings.component').then(m => m.WorkspaceSettingsComponent),
  },
];
