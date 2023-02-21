import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cli-connect-workspace',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connect-workspace.component.html',
  styleUrls: ['./connect-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWorkspaceComponent {}
