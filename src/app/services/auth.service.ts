import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private session: SessionService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.session.getSessionKey()) {
      this.router.navigateByUrl('/declaration');
      this.toastr.warning('You must accept the declaration first');
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FormCompleteService implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private session: SessionService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.session.getSessionKey()) {
      this.router.navigateByUrl('/declaration');
      this.toastr.warning('You must accept the declaration first');
      return false;
    } else if (!this.session.getFormCompleted()) {
      this.router.navigateByUrl('/user-information');
      this.toastr.warning('You must complete the information form first');
      return false;
    }
    return true;
  }
}
