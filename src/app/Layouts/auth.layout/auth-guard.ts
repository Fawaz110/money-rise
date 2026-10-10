import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../Features/Auth/Services/auth.service';
import { jwtDecode } from 'jwt-decode';

/**
 * @description checks if there is cookie stored the token then route to '/overview' else return true.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const _CookieService = inject(CookieService);
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  const token = _CookieService.get(environment.access_token);
  try {
    _AuthService.userPayload.next(jwtDecode(token));
    _AuthService.userToken.next(token);
    _Router.navigate(['/overview']);
    return false;
  }
  catch {
    return true;
  }
};
