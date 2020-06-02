import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LOCALSTORAGE_USER } from '../constants/general.constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(LOCALSTORAGE_USER)) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
