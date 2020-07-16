import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModalComponent } from './menu-modal.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('MenuModalComponent', () => {
  let component: MenuModalComponent;
  let fixture: ComponentFixture<MenuModalComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ MenuModalComponent ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
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

  it('finish should close modal', (done) => {
    component.finish().then(() => {
      done();
    });
    const res = httpMock.expectOne(req => req.method === 'DELETE' && req.url === 'storeUser');
    res.flush({});
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
