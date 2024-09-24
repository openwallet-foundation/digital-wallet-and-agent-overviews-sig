import { TestBed } from '@angular/core/testing';

import { CaseStudiesService } from './case-studies.service';

describe('CaseStudiesService', () => {
  let service: CaseStudiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseStudiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
