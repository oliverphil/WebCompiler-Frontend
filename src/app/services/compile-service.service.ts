import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompilationResult} from '../../models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompileService {

  constructor(private http: HttpClient) { }

  compile(code: string, challengeName: string) {
    const sessionKey = localStorage.getItem('sessionKey');
    return this.http.post<CompilationResult>(`${environment.apiUrl}/compile`, {
      code,
      sessionKey,
      challengeName
    });
  }
}
