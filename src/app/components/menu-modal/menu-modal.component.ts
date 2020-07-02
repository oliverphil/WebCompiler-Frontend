import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChallengesService} from '../../services/challenges.service';
import {ChallengeInstruction} from '../../../models';
import {DeclarationComponent} from '../declaration/declaration.component';

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
    private challengesService: ChallengesService,
    public modalService: NgbModal
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
}
