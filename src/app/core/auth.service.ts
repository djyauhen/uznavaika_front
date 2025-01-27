import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {LoginResponseType} from "../../../types/login-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessTokenKey: string = 'accessToken';
  public accessTokenDate: string = 'accessTokenDate';
  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private readonly http: HttpClient,
              private readonly router: Router) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  login(login: string, password: string): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'auth/login', {
      login, password
    })
  }

  refresh(): Observable<DefaultResponseType | LoginResponseType> {
    const tokens = this.getTokens();
    if (tokens) {
      return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'auth/refresh', {})
    }
    throw throwError(() => 'Can not use token')
  }

  logout() {
    const tokens = this.getTokens();
    if (tokens) {
      this.http.post<DefaultResponseType>(environment.api + 'auth/logout', {})
        .subscribe({
          next: (data) => {
            if (data.statusCode !== 200) {
              throw throwError(() => 'Ошибка выхода');
            }
            this.removeTokens();
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.removeTokens();
            this.router.navigate(['/login']);
          }
        })
    }
    throw throwError(() => 'Can not use token')
  }

  public getIsLoggedIn() {
    return this.isLogged;
  }

  public setTokens(accessToken: string): void {
    const accessTokenDate = new Date().valueOf().toString();
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.accessTokenDate, accessTokenDate);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.accessTokenDate);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  public getTokens(): { accessToken: string | null } {
    let accessToken = localStorage.getItem(this.accessTokenKey);
    const accessTokenDate = localStorage.getItem(this.accessTokenDate);
    const dateNow = new Date().valueOf();
    const duration = dateNow - (Number(accessTokenDate) + (7 * 24 * 3600 * 1000));

    if (duration > 0) {
      accessToken = null;
    }

    return {
      accessToken: accessToken
    }
  }
}
