import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WorkspaceManagerComponent } from './workspace-manager.component';

describe('WorkspaceManagerComponent', () => {
  let component: WorkspaceManagerComponent;
  let fixture: ComponentFixture<WorkspaceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceManagerComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
