import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {DeleteRequest} from '../../../models';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent implements OnInit {

  checkbox = false;
  @Input() recap = false;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!this.recap) {
      localStorage.clear();
    }
  }

  checkboxChange(e) {
    this.checkbox = e.target.checked;
  }

  continue() {
    this.sessionService.createSessionKey();
    const mag = this.route.snapshot.queryParams?.id;
    localStorage.setItem('mag', mag || 0);
    this.router.navigateByUrl('user-information');
  }
}
