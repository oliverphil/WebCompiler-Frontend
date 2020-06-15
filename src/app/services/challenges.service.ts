import { Injectable } from '@angular/core';
import {ChallengeInstruction} from '../../models';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  challenges: ChallengeInstruction[] = [
    {
      instructions: '#### Count\n' +
        '\n' +
        'Fill out the method stub to find the number of times an `item` occurs within the array `arr`\n' +
        '\n' +
        '##### Example\n' +
        '\n' +
        'Inputs  \n' +
        'arr = `[1, 2, 3, 4, 1, 2, 3, 1]`  \n' +
        'item = `1`  \n' +
        '\n' +
        'Output  \n' +
        '`3` (i.e. the number of times 1 occurs in the array)',
      starterCode: 'public static int count(int[] arr, int item) {\n' +
        '    return 0;\n' +
        '}'
    }
  ];

  currentChallenge = 0;

  challenge = new Subject<ChallengeInstruction>();

  constructor() {
    this.challenge.next(this.challenges[0]);
  }

  initChallenges(){
    this.currentChallenge = 0;
    this.challenge.next(this.challenges[0]);
  }

  gotoChallenge(x: number) {
    this.currentChallenge = x;
    this.challenge.next(this.challenges[x]);
  }

  getCurrentChallenge(): Observable<ChallengeInstruction> {
    return this.challenge.asObservable();
  }
}
