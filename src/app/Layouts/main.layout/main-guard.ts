import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../Features/Auth/Services/auth.service';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

export const mainGuard: CanActivateFn = (route, state) => {
  const _CookieService = inject(CookieService);
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  const token = _CookieService.get(environment.access_token);
  try {
    _AuthService.userPayload.next(jwtDecode(token));
    _AuthService.userToken.next(token);
    return true;
  }
  catch {
    _Router.navigate(['/auth/login']);
    return false;
  }
};
