import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthModuleService {
  constructor(private httpClient: HttpClient) {
  }

  saveGoogleUser(user) {
    return this.httpClient.post('/api/auth/saveGoogleUser', user);
  }

  login() {
    return of({
      name: 'userName',
      email: 'userEmail@test.com'
    });
  }
}
