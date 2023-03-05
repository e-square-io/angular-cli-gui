import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Directory } from '@angular-cli-gui/shared/data';
import { BehaviorSubject, Observable, of, switchMap, take } from 'rxjs';

import { WorkspaceManagerApiService } from '../../data-access/workspace-manager-api.service';

import { FilesystemNavigatorToolbarComponent } from './filesystem-navigator-toolbar/filesystem-navigator-toolbar.component';
import { FilesystemNavigatorUtilsService } from './services/filesystem-navigator-utils.service';

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
  ],
  templateUrl: './filesystem-navigator.component.html',
  styleUrls: ['./filesystem-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesystemNavigatorComponent implements OnChanges {
  private readonly fsNavigatorUtilsService = inject(
    FilesystemNavigatorUtilsService
  );
  private readonly workspaceManagerApiService = inject(
    WorkspaceManagerApiService
  );

  @Input() path: string | null = null;

  @Output() pathChange = new EventEmitter<string>();

  private readonly _isAngularWorkspace$ = new BehaviorSubject<boolean>(false);
  readonly isAngularWorkspace$ = this._isAngularWorkspace$.asObservable();
  directories$: Observable<Directory[]> = of([]);

  ngOnChanges(): void {
    if (this.path) {
      this.directories$ = this.workspaceManagerApiService.getDirectoriesInPath(
        this.path
      );
    }
  }

  onPathChanged(path: string): void {
    this.directories$
      .pipe(
        take(1),
        switchMap((directories: Directory[]) => {
          const dirname =
            this.fsNavigatorUtilsService.extractDirNameFromPath(path);
          const directory = directories.find((dir) => dir.name === dirname);
          return directory
            ? of(directory)
            : this.fsNavigatorUtilsService.getDirectoryFromParentPath(
                path,
                dirname
              );
        })
      )
      .subscribe((directory) => {
        !!directory && this.setIsAngularWorkspaceDirectory(directory.isNG);
        path !== this.path && this.emitPathChangeEvent(path);
      });
  }

  onDirClicked(directory: Directory): void {
    const path = `${this.path}/${directory.name}`;
    this.emitPathChangeEvent(path);
    this.setIsAngularWorkspaceDirectory(directory.isNG);
  }

  private emitPathChangeEvent(path: string): void {
    this.pathChange.emit(path);
  }

  private setIsAngularWorkspaceDirectory(isAngularWorkspace: boolean): void {
    this._isAngularWorkspace$.next(isAngularWorkspace);
  }
}
