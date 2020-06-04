import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CompilationResult, Decoration} from '../../../models';
import {of} from 'rxjs';
import {ACE_CONFIG, AceModule} from 'ngx-ace-wrapper';
import {CompileService} from '../../services/compile-service.service';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  const compileSpy = jasmine.createSpyObj('CompileService', ['compile']);

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
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('successful compilation should have no decorations', async (done) => {
    compileSpy.compile = (code) => of(successfulCompilation);
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
    compileSpy.compile = (code) => of(successfulCompilation);
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

    compileSpy.compile = (code) => of(unsuccessfulCompilation);
    component.compile().then(() => {
      expect(component.compilationResult).toBe(unsuccessfulCompilation.compileResult);
      expect(component.decs).toEqual(errorLines);
      done();
    });
  });
});
