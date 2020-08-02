import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompilationResult, TestResults} from '../../models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompileService {

  constructor(private http: HttpClient) { }

  compile(code: string, challengeName: string) {
    const sessionKey = localStorage.getItem('sessionKey');
    return this.http.post<CompilationResult>('/compile', {
      code,
      sessionKey,
      challengeName
    });
  }

  runTests(challengeName: string, compileTimestamp: string) {
    const sessionKey = localStorage.getItem('sessionKey');
    return this.http.post<TestResults>('/test', {
      sessionKey,
      challengeName,
      compileTimestamp
    });
  }
}
