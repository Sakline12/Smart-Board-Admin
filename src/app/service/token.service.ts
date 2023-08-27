import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor() {}

  handle(token: any) {
    // console.log('finally',token)
    this.set(token);
  }

  set(token: any) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  isValid(token: any) {
    if (this.get()) {
    }
  }
}
