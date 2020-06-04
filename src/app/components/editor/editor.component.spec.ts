import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MonacoEditorModule} from 'ngx-monaco-editor';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [
        HttpClientTestingModule,
        MonacoEditorModule.forRoot()
      ]
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
});
