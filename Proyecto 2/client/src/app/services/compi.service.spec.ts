import { TestBed } from '@angular/core/testing';

import { CompiService } from './compi.service';

describe('CompiService', () => {
  let service: CompiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
