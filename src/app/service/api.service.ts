import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private authToken: string | null = 'token123'; 
  readonly baseUrl: string = 'http://localhost';

  constructor() {}

  getToken(): string {
    return this.authToken || '';
  }

  setToken(token: string) {
    this.authToken = token;
  }
}