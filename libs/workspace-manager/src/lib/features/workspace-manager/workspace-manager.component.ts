import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Link, LINKS } from './workspace-manager.consts';

@Component({
  selector: 'cli-workspace-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    RouterLinkActive,
  ],
  templateUrl: './workspace-manager.component.html',
  styleUrls: ['./workspace-manager.component.scss'],
})
export class WorkspaceManagerComponent {
  readonly links = LINKS;
  trackBy(index: number, link: Link): Link['href'] {
    return link.href;
  }
}
