import { TestBed } from '@angular/core/testing';

import {AuthService, FormCompleteService} from './auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AuthService', () => {
  let service: AuthService;
  let formService: FormCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ]
    });
    service = TestBed.inject(AuthService);
    formService = TestBed.inject(FormCompleteService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('no session key should return false', () => {
    expect(service.canActivate(null, null)).toBe(false);
  });

  it('having session key should return true', () => {
    localStorage.setItem('sessionKey', 'key');
    expect(service.canActivate(null, null)).toBe(true);
  });

  it('form service having no session key should return false', () => {
    expect(formService.canActivate(null, null)).toBe(false);
  });

  it('form service having session key and form not completed should return false', () => {
    localStorage.setItem('sessionKey', 'key');
    expect(formService.canActivate(null, null)).toBe(false);
  });

  it('form service having session key and form completed should return true', () => {
    localStorage.setItem('sessionKey', 'key');
    localStorage.setItem('formCompleted', 'true');
    expect(formService.canActivate(null, null)).toBe(true);
  });
});
