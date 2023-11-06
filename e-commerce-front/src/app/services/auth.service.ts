import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async isLogged() {
    return localStorage.getItem("token") != null;
  }
}
