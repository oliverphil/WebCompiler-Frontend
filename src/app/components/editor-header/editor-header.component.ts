import { Component, OnInit } from '@angular/core';
import {ChallengesService} from '../../services/challenges.service';
import {Observable} from 'rxjs';
import {ChallengeInstruction} from '../../../models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MenuModalComponent} from '../menu-modal/menu-modal.component';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent {

  constructor(
    public challengesService: ChallengesService,
    private modalService: NgbModal
  ) { }

  hasNext(): boolean {
    return this.challengesService.hasNext();
  }

  hasPrev(): boolean {
    return this.challengesService.hasPrev();
  }

  next() {
    this.challengesService.next();
  }

  prev() {
    this.challengesService.prev();
  }

  showMenu() {
    this.modalService.open(MenuModalComponent, {
      keyboard: true,

    });
  }
}
