import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cli-generators-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './generators-menu.component.html',
  styleUrls: ['./generators-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorsMenuComponent {
  public menuItems = ['component', 'directive', 'module', 'pipe'];
}
