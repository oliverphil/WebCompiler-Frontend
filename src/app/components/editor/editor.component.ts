import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CompileService} from '../../services/compile-service.service';
import {ChallengeInstruction, CompilationResult, Decoration} from '../../../models';
import {AceComponent, AceConfigInterface, AceDirective} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/java';
import 'brace/theme/crimson_editor';
import {ChallengesService} from '../../services/challenges.service';
import {Observable, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  code = [
    'public static void main(String args[]) {',
    '\tSystem.out.println("Hello World");',
    '}'
  ].join('\n');

  compilationResult = '';

  config: AceConfigInterface = {
    mode: 'java',
    theme: 'crimson_editor',
    showGutter: true
  };

  decs: Decoration[] = [];

  @ViewChild(AceComponent) componentRef?: AceComponent;

  challenges: Observable<ChallengeInstruction>;
  challenge: ChallengeInstruction;
  s: Subscription;

  constructor(
    private compileService: CompileService,
    private challengesService: ChallengesService
  ) { }

  ngOnInit() {
    this.challenges = this.challengesService.getCurrentChallenge();
    this.s = this.challenges.subscribe(res => {
      this.challenge = res;
      this.code = localStorage.getItem(`challenge${this.challengesService.currentChallenge}`) || res.starterCode;
    });
    this.challengesService.initChallenges();
  }

  ngOnDestroy() {
    this.s?.unsubscribe();
  }

  async compile() {
    const aceSession = this.componentRef.directiveRef.ace().getSession();
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
    this.compilationResult = res.compileResult;
  }

  updateCode(e) {
    this.challengesService.updateUsersCode(this.code);
  }

  test(){}
}
