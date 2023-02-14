import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGenerateComponentArgs, IExecResult } from '@angular-cli-gui/shared/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneratorsService {
  constructor(private readonly http: HttpClient) {}

  generateComponent(name: string, args?: IGenerateComponentArgs): Observable<IExecResult> {
    const body = { name, ...args };
    return this.http.post<IExecResult>(`/api/generate/component`, body);
  }
}
