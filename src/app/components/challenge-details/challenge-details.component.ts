import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MarkdownService} from 'ngx-markdown';
import {ChallengesService} from '../../services/challenges.service';
import {Observable} from 'rxjs';
import {ChallengeInstruction} from '../../../models';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.scss']
})
export class ChallengeDetailsComponent implements AfterViewInit {

  @ViewChild('instructionRef') instructionRef: ElementRef;

  challenges: Observable<ChallengeInstruction>;

  constructor(
    private challengesService: ChallengesService
  ) { }

  ngAfterViewInit() {
    this.challenges = this.challengesService.getCurrentChallenge();
    this.challenges.subscribe(res => {
      this.instructionRef.nativeElement.innerHTML = res.instructions;
    });
    this.challengesService.initChallenges();
  }
}
