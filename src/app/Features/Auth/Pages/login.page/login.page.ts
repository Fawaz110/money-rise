import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../Services/auth.service';
import { catchError, exhaustMap, finalize, of, Subject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../../environments/environment.development';
import AuthInterfaces from '../../Interfaces/auth.interface.export';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe
  ],
  selector: 'app-login-page',
  styleUrl: './login.page.scss',
  templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {
  private readonly _LoginClick$ = new Subject<void>();
  private _FormBuilder = inject(FormBuilder);
  private _AuthService = inject(AuthService);
  private _CookieService = inject(CookieService);
  private _Router = inject(Router)
  _LoginForm!: FormGroup
  isLoading = signal(false)
  showPassword = signal(false)

  ngOnInit(): void {
    this.buildLoginForm();
    this.initializeLoginSubscription();
  }

  buildLoginForm() {
    this._LoginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,20}$/)]]
    })
  }

  submitLoginForm() {
    this.isLoading.set(true)
    if (this._LoginForm.status === "VALID")
      this._LoginClick$.next();
    else
      this.isLoading.set(false);
  }

  initializeLoginSubscription(): void {
    this._LoginClick$.pipe(exhaustMap(() => {
      this.isLoading.set(true);
      return this._AuthService.login(this._LoginForm.value).pipe(
        catchError(error => {
          console.error('login failed: ', error);
          return of(null);
        }),
        finalize(() => this.isLoading.set(false)));
    })).subscribe({
      next: (response) => {
        this.login(response!);
      }
    })
  }

  login(response: AuthInterfaces.UserToken) {
    this._AuthService.userPayload.next(jwtDecode(response?.token));
    this._AuthService.userToken.next(response?.token!);
    this._CookieService.set(environment.access_token, response?.token, new Date(this._AuthService.userPayload.value?.exp! * 1000), '/', undefined, true, 'Strict');
    this._Router.navigate(['/overview']);
  }

  togglePassword = () => this.showPassword.set(!this.showPassword());
}
