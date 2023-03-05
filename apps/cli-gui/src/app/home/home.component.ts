import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '@angular-cli-gui/ui';

import { MAIN_MENU_ITEMS } from '../app.consts';

@Component({
  selector: 'cli-home',
  standalone: true,
  imports: [MatSidenavModule, MenuComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  menuItems = MAIN_MENU_ITEMS;
}