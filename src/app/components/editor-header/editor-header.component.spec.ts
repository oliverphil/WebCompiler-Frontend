import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorHeaderComponent } from './editor-header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ChallengesService} from '../../services/challenges.service';

describe('EditorHeaderComponent', () => {
  let component: EditorHeaderComponent;
  let fixture: ComponentFixture<EditorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorHeaderComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('next should be called', () => {
    component.challengesService.next = () => {};
    const nextSpy = spyOn(component.challengesService, 'next').and.callThrough();
    component.next();
    expect(nextSpy).toHaveBeenCalled();
  });

  it('prev should be called', () => {
    const prevSpy = spyOn(component.challengesService, 'prev').and.callThrough();
    component.prev();
    expect(prevSpy).toHaveBeenCalled();
  });

  it('show menu should work', () => {
    component.showMenu();
    expect(component).toBeTruthy();
  });
});
