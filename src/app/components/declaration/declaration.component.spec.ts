import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationComponent } from './declaration.component';
import {RouterTestingModule} from '@angular/router/testing';
import {InformationFormComponent} from '../information-form/information-form.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DeclarationComponent', () => {
  let component: DeclarationComponent;
  let fixture: ComponentFixture<DeclarationComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationComponent],
      providers: [
        {provide: Router, useValue: routerSpy}
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to user information form', () => {
    component.continue();

    const spy = routerSpy.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toBe('user-information', 'should navigate to user form');
  });

  it('checkbox should toggle', () => {
    component.checkboxChange({target: {checked: true}});
    expect(component.checkbox).toBeTrue();
  });

  it('recap shouldn\'t clear storage', () => {
    localStorage.setItem('testItem', 'content');
    component.recap = true;
    component.ngOnInit();
    expect(localStorage.getItem('testItem')).toBeTruthy();
  });
});
