import { Routes } from '@angular/router';

import { currentWorkspaceGuard } from './guards/current-workspace.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    title: 'Home',
    canActivate: [currentWorkspaceGuard],
    loadChildren: () => import('./home/home.routes').then((m) => m.HOME_ROUTES),
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
