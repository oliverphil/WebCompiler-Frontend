import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserInformation} from '../../models';

describe('SessionService', () => {
  let service: SessionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SessionService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('if session key exists, should return existing session key', () => {
    localStorage.setItem('sessionKey', 'existing key');
    expect(service.createSessionKey()).toBe('existing key');
  });

  it('expect setFormCompleted to run successfully', (done) => {
    const userInformation: UserInformation = {
      age: 'age',
      education: 'education',
      ideExperience: 'ide experience',
      javaExperience: 'java experience',
      occupation: 'occupation',
      otherLanguages: 'other langs'
    };
    localStorage.setItem('sessionKey', 'existing key');
    service.setFormCompleted(userInformation).subscribe(() => {
      expect(req.request.body).toEqual(userInformation);
      done();
    });
    const req = httpMock.expectOne('/storeUser');
    req.flush({});
  });
});
