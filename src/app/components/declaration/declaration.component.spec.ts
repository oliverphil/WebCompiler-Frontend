import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationComponent } from './declaration.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('DeclarationComponent', () => {
  let component: DeclarationComponent;
  let fixture: ComponentFixture<DeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationComponent ],
      imports: [
        RouterTestingModule
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
});
