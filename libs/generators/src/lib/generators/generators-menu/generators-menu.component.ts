import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'cli-generators-menu',
  standalone: true,
  imports: [CommonModule, MatListModule, MatSidenavModule, MatButtonModule],
  templateUrl: './generators-menu.component.html',
  styleUrls: ['./generators-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorsMenuComponent {
  public readonly router = inject(Router);
  public menuItems = ['component', 'directive', 'module', 'pipe'];

  navigate(generatorName: string): void {
    this.router.navigate(['generators', generatorName]);
  }
}
