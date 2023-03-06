import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MenuComponent } from './menu/menu.component';
import { MenuItem } from './menu/menu.models';

@Component({
  selector: 'cli-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MenuComponent, AsyncPipe, NgClass],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() isExpanded = true;
}
