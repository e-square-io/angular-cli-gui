import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

export const currentWorkspaceGuard = (): Observable<boolean> => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const workspace$ = http.get<string[]>('/api/workspace');

  return workspace$.pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['workspace-manager', 'connect-workspace']);
      return of(false);
    })
  );
};
