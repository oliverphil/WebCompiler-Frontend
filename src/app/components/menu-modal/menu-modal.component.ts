import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChallengesService} from '../../services/challenges.service';
import {ChallengeInstruction, DeleteRequest} from '../../../models';
import {DeclarationComponent} from '../declaration/declaration.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {

  public challenges: ChallengeInstruction[];

  @ViewChild('declaration') declaration: ElementRef;

  constructor(
    public modal: NgbActiveModal,
    public challengesService: ChallengesService,
    public modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.challenges = this.challengesService.challenges;
  }

  showDeclaration() {
    this.modal.close();
    this.modalService.open(this.declaration, {
      size: 'xl'
    });
  }

  goToChallenge(index: number) {
    this.challengesService.gotoChallenge(index);
    this.modal.close();
  }

  async finish() {
    await this.http.delete<DeleteRequest>('storeUser', {headers: {
      id: this.sessionService.getSessionKey()
    }}).toPromise();
    this.modal.close();
    this.router.navigateByUrl('');
  }
}
