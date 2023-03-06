import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private isExpanded = new BehaviorSubject<boolean>(true);

  get isExpanded$(): Observable<boolean> {
    return this.isExpanded.asObservable();
  }

  toggle(): void {
    this.isExpanded.next(!this.isExpanded.value);
  }
}
