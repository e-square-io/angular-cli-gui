import { Routes } from '@angular/router';

import { GeneratorsComponent } from './generators.component';

export const GENERATOR_ROUTES: Routes = [
  {
    path: '',
    component: GeneratorsComponent,
    children: [
      {
        path: 'component',
        loadComponent: () =>
          import('./generate-component/generate-component.component').then(m => m.GenerateComponentComponent),
      },
    ],
  },
];
