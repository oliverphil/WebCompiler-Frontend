import { TestBed } from '@angular/core/testing';

import { ChallengesService } from './challenges.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ChallengesService', () => {
  let service: ChallengesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ChallengesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
