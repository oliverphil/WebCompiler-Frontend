import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  createSessionKey(): string {
    let sessionKey = localStorage.getItem('sessionKey');
    if (sessionKey) {
      return sessionKey;
    }
    sessionKey = uuid.v4();
    localStorage.setItem('sessionKey', sessionKey);
    return sessionKey;
  }

  getSessionKey(): string | undefined {
    return localStorage.getItem('sessionKey');
  }

  getFormCompleted(): boolean | undefined {
    return localStorage.getItem('formCompleted') === 'true';
  }

  setFormCompleted() {
    localStorage.setItem('formCompleted', 'true');
  }
}
