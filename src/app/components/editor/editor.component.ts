import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CompileService} from '../../services/compile-service.service';
import {CompilationResult, Decoration} from '../../../models';
import {AceComponent, AceConfigInterface, AceDirective} from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/java';
import 'brace/theme/github';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  code = [
    'public static void main(String args[]) {',
    '\tSystem.out.println("Hello World");',
    '}'
  ].join('\n');

  compilationResult = '';

  config: AceConfigInterface = {
    mode: 'java',
    theme: 'github',
    showGutter: true
  };

  decs: Decoration[] = [];

  @ViewChild(AceDirective) directiveRef?: AceDirective;
  @ViewChild(AceComponent) componentRef?: AceComponent;

  constructor(private compileService: CompileService) { }

  async compile() {
    const aceSession = this.componentRef.directiveRef.ace().getSession();
    const res = await this.compileService.compile(this.code).toPromise();
    this.decs.forEach(dec => aceSession.removeGutterDecoration(dec.lineNumber, dec.className));
    this.decs = [];

    res.errorLines.forEach(line => {
      const lineNumber = Number.parseInt(line, 10);
      aceSession.addGutterDecoration(lineNumber - 1, 'ace_error');
      this.decs.push({
        lineNumber: lineNumber - 1,
        className: 'ace_error'
      });
    });
    this.compilationResult = res.compileResult;
  }

  test(){}
}
