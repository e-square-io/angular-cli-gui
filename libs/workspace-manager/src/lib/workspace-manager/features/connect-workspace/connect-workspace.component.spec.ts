import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWorkspaceComponent } from './connect-workspace.component';

describe('ConnectWorkspaceComponent', () => {
  let component: ConnectWorkspaceComponent;
  let fixture: ComponentFixture<ConnectWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectWorkspaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
