import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Directory } from '@angular-cli-gui/shared/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceManagerApiService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = '/api/workspace-manager';

  getHomeDir(): Observable<string> {
    return this.http.get(`${this.API_URL}/homedir`, {
      responseType: 'text',
    });
  }

  getDirectoriesInPath(path: string): Observable<Directory[]> {
    return this.http.get<Directory[]>(`${this.API_URL}/dir`, {
      params: { path },
    });
  }

  getPathSeparator(): Observable<string> {
    return this.http.get(`${this.API_URL}/path-sep`, { responseType: 'text' });
  }
}
