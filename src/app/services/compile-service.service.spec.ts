import { TestBed } from '@angular/core/testing';

import { CompileService } from './compile-service.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

describe('CompileService', () => {
  let service: CompileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CompileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expect compile to run', () => {
    service.compile('code', 'challenge name');
    expect(service).toBeTruthy();
  });

  it('expect /compile endpoint to be called', (done) => {
    service.compile('code', 'challenge').subscribe(res => {
      expect(res.compileResult).toBe('success');
      done();
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/compile`);
    req.flush({compileResult: 'success'});
  });
});
