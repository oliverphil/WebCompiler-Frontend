import {Component, ElementRef, OnInit} from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import {CompileService} from '../../services/compile-service.service';
import { CompilationResult } from '../../../models';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  options = {
    contextmenu: true,
    minimap: {
      enabled: false
    }
  };

  model: CodeModel = {
    language: 'java',
    uri: '',
    value: ''
  }

  code = [
    'public static void main(String args[]) {',
    '\tSystem.out.println("Hello World");',
    '}'
  ].join('\n');

  compilationResult = '';

  constructor(private compileService: CompileService) { }

  ngOnInit(): void {
    this.model.value = this.code;
  }

  codeChanged(e) {
    this.code = this.model.value = e;
  }

  compile() {
    this.compileService.compile(this.code).subscribe((res: CompilationResult) => {
      this.compilationResult = res.compileResult;
    });
  }

  test(){}
}
