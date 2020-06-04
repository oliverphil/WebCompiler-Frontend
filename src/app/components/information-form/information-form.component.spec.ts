import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationFormComponent } from './information-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {EditorComponent} from '../editor/editor.component';
import {FormCompleteService} from '../../services/auth.service';
import {Router} from '@angular/router';

describe('InformationFormComponent', () => {
  let component: InformationFormComponent;
  let fixture: ComponentFixture<InformationFormComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationFormComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'editor',
            component: EditorComponent
          }
        ]),
        FormsModule
      ],
      providers: [
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit should navigate to editor', () => {
    component.submit('');

    const spy = routerSpy.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toBe('editor', 'should navigate to editor');
  })
});
