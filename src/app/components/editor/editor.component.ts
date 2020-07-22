import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {CompileService} from '../../services/compile-service.service';
import {ChallengeInstruction, CompilationResult, Decoration, DeleteRequest} from '../../../models';
import {AceComponent, AceConfigInterface, AceDirective} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/java';
import 'brace/theme/crimson_editor';
import {ChallengesService} from '../../services/challenges.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {SessionService} from '../../services/session.service';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  private privCode = [
    'public static void main(String args[]) {',
    '\tSystem.out.println("Hello World");',
    '}'
  ].join('\n');

  set code(code: string) {
    this.challengesService.updateUsersCode(code);
    this.privCode = code;
  }

  get code(): string {
    return this.privCode;
  }

  compilationResult = '';

  config: AceConfigInterface = {
    mode: 'java',
    theme: 'crimson_editor',
    showGutter: true
  };

  compiling = false;
  running = false;

  decs: Decoration[] = [];

  @ViewChild(AceComponent) componentRef?: AceComponent;

  challenges: Observable<ChallengeInstruction>;
  challenge: ChallengeInstruction;
  s: Subscription;

  testResults: any;
  testCompile = false;
  timeout = false;

  constructor(
    private compileService: CompileService,
    private challengesService: ChallengesService,
    private sessionService: SessionService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  @HostListener('window:beforeunload', ['$event'])
  unload(event){
    if (this.sessionService.getSessionKey()) {
      this.http.delete<DeleteRequest>('storeUser', {headers: {
        id: this.sessionService.getSessionKey()
      }}).toPromise();
    }
    event.returnValue = 'Are you sure?';
  }

  ngOnInit() {
    this.challenges = this.challengesService.getCurrentChallenge();
    this.s = this.challenges.subscribe(res => {
      this.challenge = res;
      this.code = res.starterCode;
      this.compilationResult = '';
      this.testResults = undefined;
      this.testCompile = false;
      this.timeout = false;
      if (this.componentRef) {
        const aceSession = this.componentRef.directiveRef.ace().getSession();
        this.decs.forEach(dec => aceSession.removeGutterDecoration(dec.lineNumber, dec.className));
        this.decs = [];
      }
    });
    this.challengesService.initChallenges();
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  async compile() {
    this.compiling = true;
    const aceSession = this.componentRef.directiveRef.ace().getSession();
    try {
      const res = await this.compileService.compile(this.code, this.challenge?.challengeName).toPromise();
      this.decs.forEach(dec => aceSession.removeGutterDecoration(dec.lineNumber, dec.className));
      this.decs = [];

      res?.errorLines.forEach(line => {
        const lineNumber = Number.parseInt(line, 10);
        aceSession.addGutterDecoration(lineNumber - 1, 'ace_error');
        this.decs.push({
          lineNumber: lineNumber - 1,
          className: 'ace_error'
        });
      });
      this.compilationResult = res?.compileResult || 'Error while compiling';
    } catch {
      this.toastr.warning('Error in compilation request, try run it again');
    } finally {
      this.compiling = false;
    }
  }

  async test() {
    this.running = true;
    try {
      const res = await this.compileService.runTests(this.challenge?.challengeName).toPromise();
      this.testResults = undefined;
      this.timeout = false;
      if (res.compileErrors) {
        this.testCompile = true;
      } else if (res.timeout) {
        this.timeout = true;
        this.testCompile = undefined;
      } else if (res.testResults) {
        this.testCompile = false;
        const succNum = res.testResults.filter(a => a.includes('successful'))[0].split(' ').filter(s => s !== '');
        const success = Number(succNum[1]);
        const num = res.testResults.filter(a => a.includes('found'))[0].split(' ').filter(s => s !== '');
        const total = Number(num[1]);
        if (success === total) {
          this.challengesService.markAsDone();
        }
        this.testResults = {
          success,
          total
        };
      }
    } catch {
      this.toastr.warning('Error in testing request, try run it again');
    } finally {
      this.running = false;
    }
  }
}
