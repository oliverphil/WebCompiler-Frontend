import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailsComponent } from './challenge-details.component';
import {MarkdownService} from 'ngx-markdown';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable, of, Subject} from 'rxjs';
import {ChallengeInstruction} from '../../../models';
import {ChallengesService} from '../../services/challenges.service';

describe('ChallengeDetailsComponent', () => {
  let component: ChallengeDetailsComponent;
  let fixture: ComponentFixture<ChallengeDetailsComponent>;

  const challengeServicesSpy = jasmine.createSpyObj('ChallengesService', ['getCurrentChallenge', 'initChallenges']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDetailsComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ChallengesService, useValue: challengeServicesSpy }
      ]
    })
    .compileComponents();
  }));

  const instructions = 'here are some test instructions';

  beforeEach(() => {
    const subj = new Subject<ChallengeInstruction>();
    challengeServicesSpy.getCurrentChallenge = () => {
      return subj.asObservable();
    };
    challengeServicesSpy.initChallenges = () => {
      subj.next({
        challengeName: '',
        instructions,
        starterCode: ''
      });
    };
    fixture = TestBed.createComponent(ChallengeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updated challenges should update instructionRef', () => {
    expect(component.instructionRef.nativeElement.innerHTML).toBe(instructions);
  });
});
