import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailsComponent } from './challenge-details.component';
import {MarkdownService} from 'ngx-markdown';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ChallengeDetailsComponent', () => {
  let component: ChallengeDetailsComponent;
  let fixture: ComponentFixture<ChallengeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDetailsComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
