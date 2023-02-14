import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WorkspaceSettingsService } from './workspace-settings.service';

@Component({
  selector: 'cli-workspace-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workspace-settings.component.html',
  styleUrls: ['./workspace-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceSettingsComponent {
  angularJson$ = this.workspaceSettingsService.readWorkspaceProjectNames();

  constructor(private readonly workspaceSettingsService: WorkspaceSettingsService) {}
}
