import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MenuComponent, MenuItem } from '@angular-cli-gui/ui';

@Component({
  selector: 'cli-generators',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MenuComponent],
  templateUrl: './generators.component.html',
  styleUrls: ['./generators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorsComponent {
  public menuItems: MenuItem[] = [
    'component',
    'directive',
    'module',
    'pipe',
  ].map((item) => ({
    url: item,
    displayName: item,
  }));
}
