import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

import { GeneratorsMenuComponent } from './generators-menu/generators-menu.component';

@Component({
  selector: 'cli-generators',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, GeneratorsMenuComponent],
  templateUrl: './generators.component.html',
  styleUrls: ['./generators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorsComponent {}
