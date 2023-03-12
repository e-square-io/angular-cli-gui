import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GeneratorsService } from './generators.service';

describe('GeneratorsService', () => {
  let service: GeneratorsService;
  let httpClientMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GeneratorsService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getGeneratorsList()', () => {
    it('Should call the get HTTP request to get list of generators', () => {
      service.getGeneratorsList().subscribe();
      const req = httpClientMock.expectOne('/api/generators');
      expect(req.request.method).toEqual('GET');
    });
  });
});
