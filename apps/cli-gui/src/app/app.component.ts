import { AsyncPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';

import { CoreService } from './core/core.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterOutlet, MatSelectModule, NgForOf],
  selector: 'cli-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(readonly core: CoreService) {}
}
