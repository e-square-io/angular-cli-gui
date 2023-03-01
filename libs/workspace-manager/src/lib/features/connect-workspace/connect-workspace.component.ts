import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ConnectWorkspaceService } from '../../data-access/connect-workspace.service';

@Component({
  selector: 'cli-connect-workspace',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './connect-workspace.component.html',
  styleUrls: ['./connect-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWorkspaceComponent {
  connectService = inject(ConnectWorkspaceService);
  form = new FormGroup(
    {
      path: new FormControl('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  connectWorkspace(): void {
    if (!this.form.valid) return;
    const path = this.form.controls.path.value ?? '';
    this.connectService.connectWorkspace(path).subscribe();
  }
}
