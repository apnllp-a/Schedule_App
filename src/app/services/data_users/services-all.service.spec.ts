import { TestBed } from '@angular/core/testing';

import { ServicesAllService } from './services-all.service';

describe('ServicesAllService', () => {
  let service: ServicesAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
