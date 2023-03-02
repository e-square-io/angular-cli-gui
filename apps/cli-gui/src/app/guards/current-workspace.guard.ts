import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CURRENT_WORKSPACE_PATH } from '@angular-cli-gui/shared/data';
import {
  catchError,
  map,
  Observable,
  of,
  retry,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

import { CoreService } from '../core/core.service';

export const currentWorkspaceGuard = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const core = inject(CoreService);
  const retrySubject = new Subject<void>();
  const projectNames$ = http.get<string[]>('/api/workspace/project-names');
  const currentWorkspacePath = sessionStorage.getItem(CURRENT_WORKSPACE_PATH);
  const connectWorkspace$ = http.post<void>('/api/workspace/connect', {
    path: currentWorkspacePath,
  });
  const fallbackUrl$: Observable<UrlTree> = of(
    router.parseUrl('workspace-manager/connect-workspace')
  );

  return !currentWorkspacePath
    ? fallbackUrl$
    : connectWorkspace$.pipe(
        switchMap(() =>
          projectNames$.pipe(
            // Save projects to state
            tap((projectNames) => {
              core.update({
                projectNames,
                currentProjectName: projectNames?.[0],
              });
            }),
            map(() => true)
          )
        ),
        catchError(() => {
          // if path saved in storage is invalid somehow (maybe deleted workspace)
          // remove it from storage so on 2nd retry cycle user will be navigated to workspace connection screen
          sessionStorage.removeItem(CURRENT_WORKSPACE_PATH);

          return fallbackUrl$.pipe(
            tap(() => {
              retrySubject.next();
            })
          );
        }),
        retry({ delay: () => retrySubject })
      );
};
