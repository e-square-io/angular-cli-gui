import { Routes } from '@angular/router';

export const GENERATOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./generators/generators.component').then(
        (m) => m.GeneratorsComponent
      ),
    title: 'Generators',
    children: [
      {
        path: 'component',
        loadComponent: () =>
          import(
            '../lib/generators/generators/generate-component/generate-component.component'
          ).then((m) => m.GenerateComponentComponent),
      },
    ],
  },
];
