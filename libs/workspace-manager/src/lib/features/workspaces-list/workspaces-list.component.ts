import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cli-workspaces-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workspaces-list.component.html',
  styleUrls: ['./workspaces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacesListComponent {}
