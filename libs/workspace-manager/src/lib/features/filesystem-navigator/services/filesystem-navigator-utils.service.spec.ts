import { TestBed } from '@angular/core/testing';

import { FilesystemNavigatorUtilsService } from './filesystem-navigator-utils.service';

describe('FilesystemNavigatorUtilsService', () => {
  let service: FilesystemNavigatorUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesystemNavigatorUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
