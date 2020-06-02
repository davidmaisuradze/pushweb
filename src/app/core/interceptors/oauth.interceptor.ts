import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCALSTORAGE_USER } from '../constants/general.constants';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with user id if available
    const userId = localStorage.getItem(LOCALSTORAGE_USER);

    const authReq: HttpRequest<any> = userId
      ? req.clone({ setHeaders: { Authorization: userId } })
      : req;

    return next.handle(authReq);
  }
}
