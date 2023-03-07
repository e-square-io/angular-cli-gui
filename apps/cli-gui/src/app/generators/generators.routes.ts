import { Routes } from '@angular/router';
import { GeneratorsComponent } from '@angular-cli-gui/generators';

const GENERATOR_ROUTES: Routes = [
  {
    path: '',
    component: GeneratorsComponent,
    title: 'Generators',
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
export default GENERATOR_ROUTES;
