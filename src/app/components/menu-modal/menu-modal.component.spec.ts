import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModalComponent } from './menu-modal.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MenuModalComponent', () => {
  let component: MenuModalComponent;
  let fixture: ComponentFixture<MenuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ MenuModalComponent ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show declaration should work', () => {
    component.showDeclaration();
    expect(component).toBeTruthy();
  });

  it('go to challenge should navigate to challenge', () => {
    const chalService = component.challengesService;
    chalService.challenges = [{
      challengeName: 'name',
      starterCode: 'code',
      instructions: 'instructions'
    }, {
      challengeName: 'name2',
      starterCode: 'code2',
      instructions: 'instructions2'
    }];
    component.goToChallenge(1);
    expect(chalService.currentChallenge).toBe(1);
  });
});
