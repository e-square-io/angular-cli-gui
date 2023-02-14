import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CoreService } from './core/core.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterOutlet],
  selector: 'cli-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(readonly core: CoreService) {}
}
