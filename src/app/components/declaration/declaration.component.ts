import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  continue() {
    this.sessionService.createSessionKey();
  }
}
