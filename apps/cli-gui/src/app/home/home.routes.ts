import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    children: [
      {
        path: '',
        redirectTo: 'generators',
        pathMatch: 'full',
      },
      {
        path: 'generators',
        loadChildren: () =>
          import('@angular-cli-gui/generators').then((m) => m.GENERATOR_ROUTES),
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
];

export default HOME_ROUTES;
