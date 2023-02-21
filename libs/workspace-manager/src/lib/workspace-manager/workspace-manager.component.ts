import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cli-workspace-manager',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './workspace-manager.component.html',
  styleUrls: ['./workspace-manager.component.css'],
})
export class WorkspaceManagerComponent {}
