import { NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cli-filesystem-navigator-toolbar',
  standalone: true,
  imports: [NgForOf, NgIf, MatButtonModule],
  templateUrl: './filesystem-navigator-toolbar.component.html',
  styleUrls: ['./filesystem-navigator-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesystemNavigatorToolbarComponent implements OnChanges {
  @Input() path: string | null = null;
  @Output() pathChange = new EventEmitter<string>();

  pathParts: string[] = [];

  ngOnChanges(): void {
    if (typeof this.path === 'string') {
      this.pathParts = this.path.split('/').filter((v) => !!v);
    }
  }

  onPartClicked(pathPart: string): void {
    const index = this.pathParts.findIndex((part) => part === pathPart);
    const newPath = this.pathParts.slice(0, index + 1).join('/');
    this.pathChange.emit(`/${newPath}`);
  }
}
