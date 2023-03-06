import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { SidenavService } from '@angular-cli-gui/ui';
import { delay, filter, map, startWith } from 'rxjs';

import { CoreService } from './core/core.service';

@Component({
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterOutlet,
    MatSelectModule,
    NgForOf,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  selector: 'cli-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title$ = this.router.events.pipe(
    startWith(this.title.getTitle()),
    filter((event) => event instanceof NavigationEnd),
    // The title is set after the last router event, so we need to wait until the next application cycle
    delay(0),
    map(() => this.title.getTitle())
  );

  constructor(
    readonly core: CoreService,
    readonly sidenavService: SidenavService,
    private readonly router: Router,
    private readonly title: Title
  ) {}
}
