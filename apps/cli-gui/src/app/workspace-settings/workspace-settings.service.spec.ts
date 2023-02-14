import { TestBed } from '@angular/core/testing';

import { WorkspaceSettingsService } from './workspace-settings.service';

describe('WorkspaceSettingsService', () => {
  let service: WorkspaceSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
