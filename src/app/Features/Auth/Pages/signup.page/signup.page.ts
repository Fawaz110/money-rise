import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../Services/auth.service';
import { catchError, exhaustMap, finalize, of, Subject } from 'rxjs';
import { UserToken } from '../../Interfaces/auth.interface';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    RouterLink
  ],
  selector: 'app-signup-page',
  styleUrl: './signup.page.scss',
  templateUrl: './signup.page.html',
})
export class SignupPage implements OnInit {
  _FormBuilder = inject(FormBuilder);
  _AuthService = inject(AuthService);
  _CookieService = inject(CookieService);
  _Router = inject(Router);
  private _SignupClick$ = new Subject<void>();
  _SignupForm!: FormGroup
  isLoading = signal(false)
  showPassword = signal(false)

  ngOnInit(): void {
    this.builderSignupForm();
    this.initializeLoginSubscription();
  }

  builderSignupForm() {
    this._SignupForm = this._FormBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.max(50), Validators.pattern(/^[A-Za-z\u0600-\u06FF]+(?: [A-Za-z\u0600-\u06FF]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+2)?01[0125][0-9]{8}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,20}$/)]]
    })
  }

  initializeLoginSubscription(): void {
    this._SignupClick$.pipe(exhaustMap(() => {
      this.isLoading.set(true);
      return this._AuthService.signup(this._SignupForm.value).pipe(
        catchError(error => {
          console.error('login failed: ', error);
          return of(null);
        }),
        finalize(() => this.isLoading.set(false)));
    })).subscribe({
      next: (response) => {
        this.signup(response!);
      }
    })
  }

  signup(response: UserToken) {
    this._AuthService.userPayload.next(jwtDecode(response?.token));
    this._AuthService.userToken.next(response?.token!);
    this._CookieService.set(environment.access_token, response?.token, new Date(this._AuthService.userPayload.value?.exp! * 1000), '/', undefined, true, 'Strict');
    this._Router.navigate(['/overview']);
  }

  submitSignupForm() {
    this.isLoading.set(true)
    if (this._SignupForm.status === "VALID")
      this._SignupClick$.next();
    else
      this.isLoading.set(false)
  }

  togglePassword = () => this.showPassword.set(!this.showPassword());
}
