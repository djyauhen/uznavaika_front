import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {catchError, finalize, switchMap, throwError} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {Router} from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Проверяем текущий URL
  const currentUrl = router.url;

  // Проверяем, начинается ли URL с '/admin/'
  if (!currentUrl.startsWith('/admin/')) {
    return next(req); // Пропускаем запросы, не относящиеся к admin
  }

  const tokens = authService.getTokens();

  if (tokens && tokens.accessToken) {

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokens.accessToken}`),
      withCredentials: true
    });

    return next(authReq)
      .pipe(
        catchError((error) => {
          if (error.status === 401 && !authReq.url.includes('/login') && !authReq.url.includes('/refresh')) {
            return handle401Error(authReq, next, authService, router)
          }
          return throwError(() => error);
        })
      )
  } else {
    router.navigate(['/login']);
    return throwError(() => 'Token not found');
  }
}

function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService, router: Router) {
  return authService.refresh()
    .pipe(
      switchMap((result: DefaultResponseType | LoginResponseType) => {
        let error = '';
        if ((result as DefaultResponseType) !== undefined) {
          error = (result as DefaultResponseType).message;
        }

        const refreshResult = result as LoginResponseType;
        if (!refreshResult.accessToken) {
          error = 'Ошибка авторизации';
        }

        if (error) {
          return throwError(() => error);
        }

        authService.setTokens(refreshResult.accessToken);

        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${refreshResult.accessToken}`)
        });

        return next(authReq);
      }),
      catchError((error) => {
        authService.removeTokens();
        router.navigate(['/login']);
        return throwError(error);
      })
    )
}
