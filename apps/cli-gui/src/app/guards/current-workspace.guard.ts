import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_WORKSPACE_PATH } from '@angular-cli-gui/shared/data';
import { ConnectWorkspaceService } from '@angular-cli-gui/workspace-manager';
import { catchError, map, Observable, of, retry, Subject, tap } from 'rxjs';

import { CoreService } from '../core/core.service';

export const currentWorkspaceGuard = (): Observable<boolean> => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const connectWorkspaceService = inject(ConnectWorkspaceService);
  const core = inject(CoreService);
  const retrySubject = new Subject<void>();
  const projectNames$ = http.get<string[]>('/api/workspace');
  const currentWorkspacePath = sessionStorage.getItem(CURRENT_WORKSPACE_PATH);

  return projectNames$.pipe(
    // Save projects to state
    tap((projectNames) => {
      core.update({
        projectNames,
        currentProjectName: projectNames?.[0],
      });
    }),
    // Map to true to allow navigation
    map(() => true),
    catchError(() => {
      if (!currentWorkspacePath) {
        router.navigate(['workspace-manager', 'connect-workspace']);
        return of(false);
      }

      // if path saved in local storage is invalid somehow (maybe deleted workspace)
      // remove it from local storage so on 2nd retry cycle user will be navigated to workspace connection screen
      sessionStorage.removeItem(CURRENT_WORKSPACE_PATH);

      // Connect to workspace using local storage path and retry to get projectNames
      return connectWorkspaceService
        .connectWorkspace(currentWorkspacePath)
        .pipe(
          map(() => {
            retrySubject.next();
            return false;
          })
        );
    }),
    retry({ delay: () => retrySubject })
  );
};
