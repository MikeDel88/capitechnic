import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { inject } from '@angular/core';
import { ApiService } from '../service/api.service';

export const authInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const apiService = inject(ApiService); // injecter ApiService
  const token = apiService.getToken();

  const authReq = req.clone({
    withCredentials: true,
    setHeaders: {
      'AUTH_TOKEN': token,
      'Content-Type': 'application/json'
    }
  });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      const message = err.error?.error || err.message || 'Erreur inconnue';
      return throwError(() => new Error(message));
    })
  );
};