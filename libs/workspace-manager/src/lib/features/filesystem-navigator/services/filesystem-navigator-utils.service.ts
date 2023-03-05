import { inject, Injectable } from '@angular/core';
import { Directory } from '@angular-cli-gui/shared/data';
import { map, Observable } from 'rxjs';

import { WorkspaceManagerApiService } from '../../../data-access/workspace-manager-api.service';

@Injectable({
  providedIn: 'root',
})
export class FilesystemNavigatorUtilsService {
  private readonly workspaceManagerApiService = inject(
    WorkspaceManagerApiService
  );

  extractDirNameFromPath(path: string): string {
    const pathParts = path.split('/');
    return pathParts[pathParts.length - 1];
  }

  getDirectoryFromParentPath(
    path: string,
    dirname: string
  ): Observable<Directory | undefined> {
    const parentPath = this.getParentPath(path);
    return this.workspaceManagerApiService
      .getDirectoriesInPath(parentPath)
      .pipe(map((directories) => directories.find((d) => d.name === dirname)));
  }

  getParentPath(path: string): string {
    const pathParts = path.split('/');
    return pathParts.slice(0, pathParts.length - 1).join('/');
  }
}
