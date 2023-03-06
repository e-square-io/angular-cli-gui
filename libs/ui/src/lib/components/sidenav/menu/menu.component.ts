import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

import { MenuItem } from './menu.models';

@Component({
  selector: 'cli-menu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() isExpanded = true;
}
