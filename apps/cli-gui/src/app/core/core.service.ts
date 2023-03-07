import { Injectable } from '@angular/core';
import { CURRENT_WORKSPACE_PATH } from '@angular-cli-gui/shared/data';
import { BehaviorSubject } from 'rxjs';

export interface CoreState {
  projectNames: string[];
  currentProjectName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private coreState: CoreState = { projectNames: [] };
  private readonly coreStateSubject$ = new BehaviorSubject(this.coreState);

  readonly coreState$ = this.coreStateSubject$.asObservable();

  update(state: Partial<CoreState>): void {
    this.coreState = { ...this.coreState, ...state };
    this.coreStateSubject$.next(this.coreState);
  }

  get currentWorkspacePath(): string | null {
    return sessionStorage.getItem(CURRENT_WORKSPACE_PATH);
  }
}
