import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('if session key exists, should return existing session key', () => {
    localStorage.setItem('sessionKey', 'existing key');
    expect(service.createSessionKey()).toBe('existing key');
  });
});
