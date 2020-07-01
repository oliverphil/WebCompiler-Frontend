import { TestBed } from '@angular/core/testing';

import { ChallengesService } from './challenges.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ChallengeInstruction} from '../../models';
import {environment} from '../../environments/environment';
import {first} from 'rxjs/operators';

describe('ChallengesService', () => {
  let service: ChallengesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ChallengesService);
    httpMock = TestBed.inject(HttpTestingController);
    testChallenges = [
      {
        instructions: 'instruction1',
        starterCode: 'code1',
        challengeName: 'challengeName1'
      },
      {
        instructions: 'instruction2',
        starterCode: 'code2',
        challengeName: 'challengeName2'
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let testChallenges: ChallengeInstruction[];

  it('check next goes to next challenge', (done) => {
    const obs = service.getCurrentChallenge();
    service.challenges = testChallenges;
    const sub = obs.pipe(first()).subscribe(res => {
      expect(res).toEqual(testChallenges[1]);
      expect(service.currentChallenge).toBe(1);
      done();
    });
    service.next();
  });

  it('check next with no next doesn\'t go to next challenge', () => {
    const obs = service.getCurrentChallenge();
    service.challenges = testChallenges;
    service.currentChallenge = 1;
    const sub = obs.subscribe(res => {
      sub.unsubscribe();
      fail();
    });
    service.next();
    expect(service.currentChallenge).toBe(1);
    sub.unsubscribe();
  });

  it('check prev goes to previous challenge', (done) => {
    const obs = service.getCurrentChallenge();
    service.challenges = testChallenges;
    service.currentChallenge = 1;
    const sub = obs.subscribe(res => {
      expect(res).toEqual(testChallenges[0]);
      expect(service.currentChallenge).toBe(0);
      sub.unsubscribe();
      done();
    });
    service.prev();
  });

  it('check go to challenge works', (done) => {
    const obs = service.getCurrentChallenge();
    service.challenges = testChallenges;
    const sub = obs.subscribe(res => {
      expect(res).toEqual(testChallenges[1]);
      expect(service.currentChallenge).toBe(1);
      sub.unsubscribe();
      done();
    });
    service.gotoChallenge(1);
  });

  it('check user code gets updated', (done) => {
    service.challenges = testChallenges;
    service.updateUsersCode('updatedCode');
    expect(service.challenges[0].userCode).toBe('updatedCode');
    done();
  });

  it('check empty updated user code sets to starter code', () => {
    service.challenges = testChallenges;
    service.updateUsersCode('');
    expect(service.challenges[0].userCode).toBe('code1');
  });

  it('check init challenges runs', () => {
    service.initChallenges();
    const req = httpMock.expectOne(`${environment.apiUrl}/challenges`);
    req.flush(testChallenges);
    expect(service.currentChallenge).toBe(0);
  });

  it('check images get correct path', () => {
    service.initChallenges();
    const req = httpMock.expectOne(`${environment.apiUrl}/challenges`);
    req.flush([{
      instructions: '<img src="testImage.png">',
      starterCode: 'code1',
      challengeName: 'challengeName1'
    },
    {
      instructions: '<img src="testImage.jpg">',
      starterCode: 'code1',
      challengeName: 'challengeName1'
    }]);
    expect(service.challenges[0].instructions).toBe(`<img src="${environment.apiUrl}/testImage.png">`);
    expect(service.challenges[1].instructions).toBe('<img src="testImage.jpg">');
  });

  it('check when challenges already exist', () => {
    service.challenges = undefined;
    service.initChallenges();
    const req = httpMock.expectOne(`${environment.apiUrl}/challenges`);
    req.flush(testChallenges);
    service.initChallenges();
    httpMock.expectNone(`${environment.apiUrl}/challenges`);
    expect(service.currentChallenge).toBe(0);
    expect(service.challenges).toEqual(testChallenges);
  });

  it('mark as done sets done flag on challenge', (done) => {
    const obs = service.getCurrentChallenge();
    service.challenges = testChallenges;
    service.currentChallenge = 0;
    const sub = obs.subscribe(res => {
      expect(res.complete).toBeTruthy();
      sub.unsubscribe();
      done();
    });
    service.markAsDone();
    service.gotoChallenge(0);
  });
});
