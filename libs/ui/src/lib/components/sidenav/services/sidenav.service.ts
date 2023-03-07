import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private isExpanded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  isExpanded$: Observable<boolean> = this.isExpanded.asObservable();

  toggle(): void {
    this.isExpanded.next(!this.isExpanded.value);
  }
}
