import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceSettingsService {
  constructor(private readonly http: HttpClient) {}

  readWorkspaceProjectNames(): Observable<string[]> {
    return this.http.get<string[]>(`/api/workspace`);
  }
}
