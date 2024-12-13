import { TestBed } from '@angular/core/testing';

import { SeatsServiceService } from './seats-service.service';

describe('SeatsServiceService', () => {
  let service: SeatsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
