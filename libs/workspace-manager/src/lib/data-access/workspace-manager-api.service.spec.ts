import { TestBed } from '@angular/core/testing';

import { WorkspaceManagerApiService } from './workspace-manager-api.service';

describe('WorkspaceManagerApiService', () => {
  let service: WorkspaceManagerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceManagerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
