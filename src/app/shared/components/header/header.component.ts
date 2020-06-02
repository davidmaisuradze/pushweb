import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { AuthModuleService } from '../../../core/services/auth-module.service';
import { LOCALSTORAGE_USER } from '../../../core/constants/general.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<any>;

  constructor(
    private authService: AuthService,
    private authModuleService: AuthModuleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.authService.authState;

    this.authService.authState.subscribe(user => {
      console.log(user, 'user');
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      localStorage.setItem(LOCALSTORAGE_USER, user.id);
      this.authModuleService.saveGoogleUser(user).subscribe(result => {
        console.log(result, 'result');
      });
    });
  }

  signOutFromGoogle() {
    this.authService.signOut().then(result => {
      localStorage.removeItem(LOCALSTORAGE_USER);
      this.router.navigate(['/']);
    });
  }
}
