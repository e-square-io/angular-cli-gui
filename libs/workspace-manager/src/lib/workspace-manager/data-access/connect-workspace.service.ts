import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_WORKSPACE_PATH } from '@angular-cli-gui/shared/data';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectWorkspaceService {
  http = inject(HttpClient);
  router = inject(Router);

  connectWorkspace(path: string): Observable<void> {
    return this.http.post<void>('/api/workspace/connect', { path }).pipe(
      tap(() => {
        localStorage.setItem(CURRENT_WORKSPACE_PATH, path);
        this.router.navigate(['']);
      })
    );
  }
}
