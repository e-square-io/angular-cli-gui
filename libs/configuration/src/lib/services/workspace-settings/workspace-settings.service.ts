import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@angular-cli-gui/shared/data';
import { JsonObject } from '@angular-devkit/core/src/json/utils';
import { JSONSchema7 } from 'json-schema';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceSettingsService {
  constructor(private readonly http: HttpClient) {}

  readWorkspaceProjectNames(): Observable<string[]> {
    return this.http.get<string[]>(`/api/workspace/project-names`);
  }

  readWorkspaceProject(projectName: string): Observable<JsonObject> {
    return this.http.get<JsonObject>(`/api/workspace/project/${projectName}`);
  }

  readWorkspaceProjectConfiguration(): Observable<JSONSchema7> {
    return this.http.get<JSONSchema7>(`/api/workspace/workspace-configuration`);
  }

  updateWorkspaceProjectConfiguration(
    projectName: string,
    projectData: Project
  ): Observable<Project> {
    return this.http.patch<Project>(`/api/workspace/project/${projectName}`, {
      ...projectData,
    });
  }
}
