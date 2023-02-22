import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cli-generators-menu',
  standalone: true,
  imports: [CommonModule, MatListModule, MatSidenavModule, MatButtonModule],
  templateUrl: './generators-menu.component.html',
  styleUrls: ['./generators-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorsMenuComponent {
  menuItems = ['Component', 'Directive', 'Module', 'Pipe'];
}
