import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Directory } from '@angular-cli-gui/shared/data';

import { FilesystemNavigatorToolbarComponent } from './filesystem-navigator-toolbar/filesystem-navigator-toolbar.component';

@Component({
  selector: 'cli-filesystem-navigator',
  standalone: true,
  imports: [
    MatListModule,
    NgForOf,
    NgIf,
    MatDividerModule,
    MatIconModule,
    FilesystemNavigatorToolbarComponent,
    AsyncPipe,
    NgTemplateOutlet,
  ],
  templateUrl: './filesystem-navigator.component.html',
  styleUrls: ['./filesystem-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesystemNavigatorComponent {
  @Input() path: string | null = null;
  @Input() directories: Directory[] | null = [];
  @Input() separator: string | null = '';

  @Output() pathChange = new EventEmitter<string>();

  onPathChanged(path: string): void {
    this.emitPathChangeEvent(path);
  }

  onDirClicked(directory: Directory): void {
    const path = `${this.path}${this.separator}${directory.name}`;
    this.onPathChanged(path);
  }

  private emitPathChangeEvent(path: string): void {
    this.pathChange.emit(path);
  }
}
