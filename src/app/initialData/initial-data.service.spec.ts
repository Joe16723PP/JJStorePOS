import { TestBed } from '@angular/core/testing';

import { InitialDataService } from './initial-data.service';

describe('InitailDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitialDataService = TestBed.get(InitialDataService);
    expect(service).toBeTruthy();
  });
});
