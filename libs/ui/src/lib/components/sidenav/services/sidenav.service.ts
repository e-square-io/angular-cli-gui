import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private _isExpanded = true;
  private isExpanded = new BehaviorSubject<boolean>(this._isExpanded);

  get isExpanded$(): Observable<boolean> {
    return this.isExpanded.asObservable();
  }

  toggle(): void {
    this.update(!this._isExpanded);
  }

  private update(state: boolean): void {
    this._isExpanded = state;
    this.isExpanded.next(this._isExpanded);
  }
}
