import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.getIsLoggedIn();

  if (!isLoggedIn) {
    // Перенаправление на login при отсутствии токена
    router.navigate(['/login']); // Сохраняем текущий URL для последующего возвращения
    return false;
  }

  return true;
};
