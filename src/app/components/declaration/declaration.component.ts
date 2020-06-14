import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent implements OnInit {

  checkbox: boolean = false;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  continue() {
    this.sessionService.createSessionKey();
    this.router.navigateByUrl('user-information');
  }
}
