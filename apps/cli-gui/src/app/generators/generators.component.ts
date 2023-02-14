import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'cli-generators',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './generators.component.html',
  styleUrls: ['./generators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorsComponent {}
