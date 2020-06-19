import { Component, OnInit } from '@angular/core';
import {ChallengesService} from '../../services/challenges.service';
import {Observable} from 'rxjs';
import {ChallengeInstruction} from '../../../models';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent {

  constructor(
    public challengesService: ChallengesService
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
}
