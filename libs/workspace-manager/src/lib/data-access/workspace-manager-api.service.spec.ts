import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WorkspaceManagerApiService } from './workspace-manager-api.service';

describe('WorkspaceManagerApiService', () => {
  let service: WorkspaceManagerApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WorkspaceManagerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHomeDir', () => {
    it('should call the get homedir api', () => {
      service.getHomeDir().subscribe();
      const request = http.expectOne('/api/workspace-manager/homedir');
      expect(request.request.method).toEqual('GET');
    });
  });

  describe('getDirectoriesInPath', () => {
    it('should call get directories in path api with path as params', () => {
      service.getDirectoriesInPath('/mock/path').subscribe();
      const req = http.expectOne('/api/workspace-manager/dir?path=/mock/path');
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('getPathSeparator', () => {
    it('should call the get path separator api', () => {
      service.getPathSeparator().subscribe();
      const req = http.expectOne('/api/workspace-manager/path-sep');
      expect(req.request.method).toEqual('GET');
    });
  });
});
