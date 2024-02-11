import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return next.handle(req);
    }

    const headers = req.headers.set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
