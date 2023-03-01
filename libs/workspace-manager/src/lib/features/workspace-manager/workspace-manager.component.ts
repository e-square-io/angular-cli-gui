import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Link, LINKS } from './workspace-manager.consts';

@Component({
  selector: 'cli-workspace-manager',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatIconModule,
    RouterLinkActive,
    NgForOf,
    MatTabsModule,
  ],
  templateUrl: './workspace-manager.component.html',
  styleUrls: ['./workspace-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceManagerComponent {
  readonly links = LINKS;
  activeLink: Link = this.links[this.links.length - 1];

  trackByHref(index: number, link: Link): Link['href'] {
    return link.href;
  }
}
