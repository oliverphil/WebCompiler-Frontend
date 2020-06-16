import { Injectable } from '@angular/core';
import {ChallengeInstruction} from '../../models';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  challenges: ChallengeInstruction[];

  currentChallenge;

  challenge = new Subject<ChallengeInstruction>();

  constructor(
    private http: HttpClient
  ) {
    this.currentChallenge = 0;
  }

  initChallenges() {
    if (!this.challenges) {
      this.http.get<ChallengeInstruction[]>(`${environment.apiUrl}/challenges`).subscribe(res => {
        res.filter(c => c.instructions.includes('img')).forEach(challenge => {
          const instructions = challenge.instructions;
          const instArr = instructions.split('"');
          for (const s in instArr) {
            if (instArr[s].includes('.png')) {
              instArr[s] = `${environment.apiUrl}/${instArr[s]}`;
            }
          }
          challenge.instructions = instArr.join('"');
        });
        this.challenges = res;
        this.currentChallenge = 0;
        this.challenge.next(this.challenges[0]);
      });
    } else {
      this.currentChallenge = 0;
      this.challenge.next(this.challenges[0]);
    }
  }

  hasNext(): boolean {
    return this.currentChallenge === 0 || this.currentChallenge !== this.challenges.length - 1;
  }

  next() {
    if (this.hasNext()) {
      this.currentChallenge += 1;
      this.challenge.next(this.challenges[this.currentChallenge]);
    }
  }

  hasPrev(): boolean {
    return this.currentChallenge !== 0;
  }

  prev() {
    if (this.hasPrev()) {
      this.currentChallenge -= 1;
      this.challenge.next(this.challenges[this.currentChallenge]);
    }
  }

  gotoChallenge(x: number) {
    this.currentChallenge = x;
    this.challenge.next(this.challenges[x]);
  }

  getCurrentChallenge(): Observable<ChallengeInstruction> {
    return this.challenge.asObservable();
  }
}
