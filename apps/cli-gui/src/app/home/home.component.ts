import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '@angular-cli-gui/ui';

import { HOME_MENU_ITEMS } from './home.consts';

@Component({
  selector: 'cli-home',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  menuItems = HOME_MENU_ITEMS;
}
