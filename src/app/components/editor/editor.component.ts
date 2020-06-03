import {Component, ElementRef, OnInit} from '@angular/core';
import {CompileService} from '../../services/compile-service.service';
import { CompilationResult } from '../../../models';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  options = {
    theme: 'vs',
    contextmenu: true,
    minimap: {
      enabled: false
    },
    glyphMargin: true,
    language: 'java'
  };

  code = [
    'public static void main(String args[]) {',
    '\tSystem.out.println("Hello World");',
    '}'
  ].join('\n');

  compilationResult = '';

  editor: any;
  decorations;

  constructor(private compileService: CompileService) { }

  onEditorInit(editor: any): void {
    this.editor = editor;
  }

  compile() {
    this.compileService.compile(this.code).subscribe((res: CompilationResult) => {
      let decs = [];
      res.errorLines.forEach(line => {
        const lineNumber = Number.parseInt(line, 10);
        decs.push({
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          options: {
            isWholeLine: true,
            glyphMarginClassName: 'bg-danger'
          }
        });
      });
      if (decs.length === 0) {
        decs = [{
          range: new monaco.Range(1, 1, 1, 1),
          options: {}
        }];
      }
      this.decorations = this.editor.deltaDecorations(this.decorations ? this.decorations : [], decs);
      this.compilationResult = res.compileResult;
    });
  }

  test(){}
}
