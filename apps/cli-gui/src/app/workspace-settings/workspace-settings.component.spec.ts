import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceSettingsComponent } from './workspace-settings.component';

describe('WorkspaceSettingsComponent', () => {
  let component: WorkspaceSettingsComponent;
  let fixture: ComponentFixture<WorkspaceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceSettingsComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
