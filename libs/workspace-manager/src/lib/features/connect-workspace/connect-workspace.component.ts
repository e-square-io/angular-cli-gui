import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  CURRENT_WORKSPACE_PATH,
  Directory,
} from '@angular-cli-gui/shared/data';
import {
  BehaviorSubject,
  combineLatest,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

import { ConnectWorkspaceService } from '../../data-access/connect-workspace.service';
import { WorkspaceManagerApiService } from '../../data-access/workspace-manager-api.service';
import { FilesystemNavigatorComponent } from '../../ui';

@Component({
  selector: 'cli-connect-workspace',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FilesystemNavigatorComponent],
  templateUrl: './connect-workspace.component.html',
  styleUrls: ['./connect-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWorkspaceComponent implements OnInit, OnDestroy {
  connectService = inject(ConnectWorkspaceService);
  workspaceManagerApiService = inject(WorkspaceManagerApiService);

  directories$ = new BehaviorSubject<Directory[]>([]);
  path$ = new BehaviorSubject<string | null>(null);
  pathSeparator$ = new BehaviorSubject<string | null>(null);
  isAngularWorkspace$ = new BehaviorSubject<boolean>(false);
  private destroyed$ = new Subject<boolean>();

  ngOnInit(): void {
    this.workspaceManagerApiService
      .getPathSeparator()
      .subscribe((separator) => {
        this.pathSeparator$.next(separator);
        this.initWorkspacePath();
      });

    combineLatest([this.path$, this.pathSeparator$])
      .pipe(
        switchMap(([path, separator]) => {
          path && separator && this.setIsAngularWorkspace(path, separator);
          return path
            ? this.workspaceManagerApiService.getDirectoriesInPath(path)
            : of([]);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((directories) => {
        this.directories$.next(directories);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  connectWorkspace(): void {
    const path = this.path$.getValue();
    if (path) {
      this.connectService.connectWorkspace(path).subscribe();
    }
  }

  onPathChanged(path: string): void {
    if (path !== this.path$.getValue()) {
      this.path$.next(path);
    }
  }

  private initWorkspacePath(): void {
    const currentWorkspacePath = sessionStorage.getItem(CURRENT_WORKSPACE_PATH);
    const path$ = currentWorkspacePath
      ? of(currentWorkspacePath)
      : this.workspaceManagerApiService.getHomeDir();
    path$.subscribe((path: string) => this.path$.next(path));
  }

  private setIsAngularWorkspace(path: string, separator: string): void {
    const parentPath = this.getParentPath(path, separator);
    this.workspaceManagerApiService
      .getDirectoriesInPath(parentPath)
      .subscribe((directories) => {
        const dir = directories.find(
          (d: Directory) => `${parentPath}${separator}${d.name}` === path
        );
        this.isAngularWorkspace$.next(dir?.isNG ?? false);
      });
  }

  private getParentPath(path: string, separator: string): string {
    const pathParts = path.split(separator);
    return pathParts.slice(0, pathParts.length - 1).join(separator);
  }
}
