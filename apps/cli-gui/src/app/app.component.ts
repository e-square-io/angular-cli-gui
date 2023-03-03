import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MenuComponent } from '@angular-cli-gui/ui';
import { delay, filter, map, startWith } from 'rxjs';

import { MAIN_MENU_ITEMS } from './app.consts';
import { CoreService } from './core/core.service';

@Component({
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterOutlet,
    MatSelectModule,
    NgForOf,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    MenuComponent,
    MatToolbarModule,
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

  menuItems = MAIN_MENU_ITEMS;

  constructor(
    readonly core: CoreService,
    private readonly router: Router,
    private readonly title: Title
  ) {}
}
