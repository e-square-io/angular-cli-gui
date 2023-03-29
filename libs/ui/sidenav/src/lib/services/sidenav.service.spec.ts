import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { skip, take } from 'rxjs';

import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  let service: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NoopAnimationsModule] });
    service = TestBed.inject(SidenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle state', fakeAsync(() => {
    // initial value.
    service.isExpanded$.pipe(take(1)).subscribe((state) => {
      expect(state).toBeTruthy();
    });
    // after toggle.
    service.isExpanded$.pipe(skip(1)).subscribe((state) => {
      expect(state).toBeFalsy();
    });
    service.toggle();
    tick();
  }));
});
