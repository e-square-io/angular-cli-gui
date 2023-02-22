import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GeneratorsMenuComponent } from './generators-menu/generators-menu.component';

@Component({
  selector: 'cli-generators',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, GeneratorsMenuComponent],
  templateUrl: './generators.component.html',
  styleUrls: ['./generators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorsComponent {
}
