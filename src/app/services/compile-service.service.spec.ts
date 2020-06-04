import { TestBed } from '@angular/core/testing';

import { CompileService } from './compile-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CompileService', () => {
  let service: CompileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CompileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
