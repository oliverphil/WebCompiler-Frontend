import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import * as uuid from 'uuid';
import {HttpClient} from '@angular/common/http';
import {UserInformation} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) { }

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

  setFormCompleted(userInformation: UserInformation) {
    userInformation.id = localStorage.getItem('sessionKey');
    userInformation.magic = localStorage.getItem('mag');
    localStorage.setItem('formCompleted', 'true');
    return this.http.post<UserInformation>('/storeUser', { ...userInformation });
  }
}
