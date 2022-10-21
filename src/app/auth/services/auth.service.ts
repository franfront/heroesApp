import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth.interface';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  private authUser: Auth | undefined;

  get auth() {
    return { ...this.authUser! };
  }

  constructor(private http: HttpClient) {}

  verificaion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    } else {
      return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
        map((auth) => {
          this.authUser = auth;
          return true;
        })
      );
    }
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this.authUser = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }

  logout() {
    this.authUser = undefined;
  }
}
