import { environment } from '@env/environment';
import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localstorageService: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageService.getToken();
    const isApiUrl = request.url.startsWith(environment.apiURL);
    if(token && isApiUrl) {
      request = request.clone({
        setHeaders:  {
          Authorization: `Bearer ${token}`,
          Message: "Hello Sokar in Interceptor"
        }
      })
    }
    return next.handle(request);
  }

}
