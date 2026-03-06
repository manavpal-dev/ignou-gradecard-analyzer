import { TestBed } from '@angular/core/testing';

import { Gradecard } from './gradecard';

describe('Gradecard', () => {
  let service: Gradecard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gradecard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
