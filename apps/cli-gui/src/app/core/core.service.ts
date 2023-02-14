import { Injectable } from '@angular/core';
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

  // constructor() {}

  update(state: Partial<CoreState>): void {
    this.coreState = { ...this.coreState, ...state };
    this.coreStateSubject$.next(this.coreState);
  }
}
