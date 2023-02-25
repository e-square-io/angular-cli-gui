import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cli-create-workspace',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWorkspaceComponent {}
