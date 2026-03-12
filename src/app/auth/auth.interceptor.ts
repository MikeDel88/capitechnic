import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { ApiService } from '../service/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.apiService.getToken();

    const authReq = req.clone({
      setHeaders: {
        'AUTH_TOKEN': token,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        const message = err.error?.error || err.message || 'Erreur inconnue';
        return throwError(() => new Error(message));
      })
    );
  }
}