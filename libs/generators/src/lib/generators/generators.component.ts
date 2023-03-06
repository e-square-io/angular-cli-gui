import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, SidenavComponent } from '@angular-cli-gui/ui';

@Component({
  selector: 'cli-generators',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
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
