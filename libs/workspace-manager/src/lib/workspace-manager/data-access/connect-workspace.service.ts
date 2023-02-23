import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectWorkspaceService {
  http = inject(HttpClient);
  router = inject(Router);

  connectWorkspace(path: string): Observable<void> {
    return this.http.post<void>('/api/workspace/connect', { path }).pipe(
      tap(() => {
        this.router.navigate(['']);
      })
    );
  }
}
