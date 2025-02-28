import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {UserInformation} from '../../../models';

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.scss']
})
export class InformationFormComponent implements OnInit {

  public userInformation: UserInformation = {
    age: undefined,
    occupation: undefined,
    education: undefined,
    javaExperience: undefined,
    otherLanguages: undefined,
    ideExperience: undefined
  };

  javaExperienceOptions = [
    '1-3',
    '4-6',
    '7-9',
    '>9'
  ];

  ageOptions = [
    '<20',
    '20-24',
    '25-29',
    '30-34',
    '35-39',
    '40-44',
    '45-49',
    '50-54',
    '>54'
  ];

  constructor(
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit(): void {
  }

  async submit(e) {
    await this.session.setFormCompleted(this.userInformation).toPromise();
    this.router.navigateByUrl('editor');
  }
}
