import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompilationResult} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CompileService {

  constructor(private http: HttpClient) { }

  compile(code: string) {
    return this.http.post<CompilationResult>('/compile', code);
  }
}
