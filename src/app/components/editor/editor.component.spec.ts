import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ChallengeInstruction, CompilationResult, Decoration} from '../../../models';
import {of, Subject} from 'rxjs';
import {ACE_CONFIG, AceModule} from 'ngx-ace-wrapper';
import {CompileService} from '../../services/compile-service.service';
import {ChallengesService} from '../../services/challenges.service';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  const compileSpy = jasmine.createSpyObj('CompileService', ['compile']);
  const challengeServicesSpy = jasmine.createSpyObj('ChallengesService', ['getCurrentChallenge', 'initChallenges']);


  const successfulCompilation: CompilationResult = {
    compileResult: 'Compilation Successful',
    errorLines: []
  };

  const unsuccessfulCompilation: CompilationResult = {
    compileResult: 'Compilation Unsuccessful',
    errorLines: ['1', '2', '3']
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [
        HttpClientTestingModule,
        AceModule
      ],
      providers: [{
        provide: ACE_CONFIG,
        useValue: {}
      },
      {
        provide: CompileService,
        useValue: compileSpy
      },
      {
        provide: ChallengesService,
        useValue: challengeServicesSpy
      }]
    })
      .compileComponents();
  }));

  const exampleChallenge = {
    challengeName: 'exampleChallenge',
    instructions: 'here are some test instructions',
    starterCode: 'test code;'
  };

  const subj = new Subject<ChallengeInstruction>();

  beforeEach(() => {
    challengeServicesSpy.getCurrentChallenge = () => {
      return subj.asObservable();
    };
    challengeServicesSpy.initChallenges = () => {
      subj.next(exampleChallenge);
    };
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('successful compilation should have no decorations', async (done) => {
    compileSpy.compile = (code, challengeName: '') => of(successfulCompilation);
    component.compile().then(() => {
      expect(component.compilationResult).toBe('Compilation Successful');
      expect(component.decs).toEqual([]);
      done();
    });
  });

  it('successful compilation after unsuccessful should clear decorations', async (done) => {
    component.compilationResult = 'some error message';
    component.decs = [{
      lineNumber: 1,
      className: 'ace_error'
    }];
    compileSpy.compile = (code, challengeName: '') => of(successfulCompilation);
    component.compile().then(() => {
      expect(component.compilationResult).toBe('Compilation Successful');
      expect(component.decs).toEqual([]);
      done();
    });
  });

  it('error lines should be added to decorations', async (done) => {
    const errorLines: Decoration[] = [
      {
        lineNumber: 0,
        className: 'ace_error'
      },
      {
        lineNumber: 1,
        className: 'ace_error'
      },
      {
        lineNumber: 2,
        className: 'ace_error'
      }
    ];

    compileSpy.compile = (code, challengeName: '') => of(unsuccessfulCompilation);
    component.compile().then(() => {
      expect(component.compilationResult).toBe(unsuccessfulCompilation.compileResult);
      expect(component.decs).toEqual(errorLines);
      done();
    });
  });

  it('updated subject should assign challenges and code variables', () => {
    expect(component.challenge).toEqual(exampleChallenge);
    expect(component.code).toBe(exampleChallenge.starterCode);
  });

  it('compilation with no challenge or res', async (done) => {
    component.challenge = null;
    compileSpy.compile = (code, challengeName) => of(null);
    component.compile().then(() => {
      expect(component.compilationResult).toBe('Error while compiling');
      expect(component.decs).toEqual([]);
      done();
    });
  });
});
