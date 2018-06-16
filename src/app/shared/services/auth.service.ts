import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
@Injectable()
export class AuthService {
  public getToken(): string {
    const  user = JSON.parse(sessionStorage.getItem('user'));
    return user!=undefined? user.token: null;
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    if (token) {
        return true;
    } else {
        return false;
    }
  }
}
