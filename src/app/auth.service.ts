import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name == 'pikachu' && password == 'pikachu');

    return of(isLoggedIn).pipe(
      delay(1000),//1sec
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)//on maj isLoggedIn
    )
  }

  logout(){ 
    this.isLoggedIn = false;
  }
}
