import { TestBed } from '@angular/core/testing';

import { GenericserviceService } from './genericservice.service';

describe('GenericserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericserviceService = TestBed.get(GenericserviceService);
    expect(service).toBeTruthy();
  });
});
