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
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';

import { ANGULAR_LOGO_IMG_SRC } from '../../consts';
import { WorkspaceManagerApiService } from '../../data-access/workspace-manager-api.service';
import { extractDirnameFromPath, getParentPath } from '../../utils';

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
  ],
  templateUrl: './filesystem-navigator.component.html',
  styleUrls: ['./filesystem-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesystemNavigatorComponent implements OnChanges {
  private readonly workspaceManagerApiService = inject(
    WorkspaceManagerApiService
  );

  @Input() path: string | null = null;

  @Output() pathChange = new EventEmitter<string>();

  readonly isAngularWorkspace$ = new BehaviorSubject<boolean>(false);
  readonly directories$ = new BehaviorSubject<Directory[]>([]);
  readonly angularLogoSrc = ANGULAR_LOGO_IMG_SRC;

  ngOnChanges(): void {
    if (this.path) {
      this.getDirectoriesInPath(this.path).subscribe((directories) =>
        this.directories$.next(directories)
      );
    }
  }

  onPathChanged(path: string): void {
    this.directories$
      .pipe(
        take(1),
        switchMap((directories: Directory[]) =>
          this.findDirectory(path, directories)
        )
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

  private getDirectoriesInPath(path: string): Observable<Directory[]> {
    return this.workspaceManagerApiService.getDirectoriesInPath(path);
  }

  private findDirectory(
    path: string,
    directories: Directory[]
  ): Observable<Directory | undefined> {
    const dirname = extractDirnameFromPath(path);
    const directory = directories.find((dir) => dir.name === dirname);
    return directory
      ? of(directory)
      : this.getDirectoryFromParentPath(path, dirname);
  }

  private emitPathChangeEvent(path: string): void {
    this.pathChange.emit(path);
  }

  private setIsAngularWorkspaceDirectory(isAngularWorkspace: boolean): void {
    this.isAngularWorkspace$.next(isAngularWorkspace);
  }

  private getDirectoryFromParentPath(
    path: string,
    dirname: string
  ): Observable<Directory | undefined> {
    const parentPath = getParentPath(path);
    return this.getDirectoriesInPath(parentPath).pipe(
      map((directories) => directories.find((d) => d.name === dirname))
    );
  }
}
