import { TestBed } from '@angular/core/testing';

import { IFDbAPIservice } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: IFDbAPIservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IFDbAPIservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
