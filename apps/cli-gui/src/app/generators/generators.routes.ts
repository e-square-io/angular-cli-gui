import { Routes } from '@angular/router';
import { GeneratorsComponent } from '@angular-cli-gui/generators';

export const GENERATOR_ROUTES: Routes = [
  {
    path: '',
    component: GeneratorsComponent,
    children: [
      {
        path: 'component',
        loadComponent: () =>
          import('@angular-cli-gui/generators').then(
            (m) => m.GenerateComponentComponent
          ),
      },
    ],
  },
];
