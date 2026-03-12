import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './auth/auth.interceptor';
import { ApiService } from './service/api.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    ApiService, 
    provideHttpClient(withInterceptors([authInterceptorFn]))
  ]
};
