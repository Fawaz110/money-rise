import { Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Avatar } from '../../../../Shared/Components/avatar/avatar';
import { Otp } from '../../../../Shared/Components/otp/otp';
import { AuthService } from '../../Services/auth.service';
import { BehaviorSubject, catchError, exhaustMap, finalize, of, Subject } from 'rxjs';
import AuthInterfaces from '../../Interfaces/auth.interface.export';
import Helper from '../../../../Shared/Helpers/helper.export';

@Component({
  imports: [
    RouterLink,
    TranslatePipe,
    Avatar,
    FormsModule,
    ReactiveFormsModule,
    Otp
  ],
  selector: 'app-recovery-page',
  styleUrl: './recovery.page.scss',
  templateUrl: './recovery.page.html',
})
export class RecoveryPage implements OnInit {
  _FormBuilder = inject(FormBuilder);
  _AuthService = inject(AuthService);
  _EmailFormClick$ = new Subject<void>();
  _SendOTPClick$ = new Subject<void>();
  @ViewChild('recoveryForm') recoveryFormRef!: ElementRef<HTMLDivElement>
  @ViewChild('recoveryAccount') recoveryAccountRef!: ElementRef<HTMLDivElement>
  @ViewChild('otpForm') otpFormRef!: ElementRef<HTMLDivElement>
  otpSent = signal(false);
  loading = signal(false);
  accountFound: WritableSignal<boolean | undefined> = signal(undefined);
  account: BehaviorSubject<AuthInterfaces.UserSummary | null> = new BehaviorSubject<AuthInterfaces.UserSummary | null>(null);
  emailForm!: FormGroup

  ngOnInit(): void {
    this.buildEmailForm();
    this.initializeEmailSubscription();
    this.initializeOTPSubscription();
  }

  buildEmailForm() {
    this.emailForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  initializeEmailSubscription(): void {
    this._EmailFormClick$.pipe(exhaustMap(() => {
      this.loading.set(true);
      return this._AuthService.recovery(this.emailForm.get('email')?.value).pipe(
        catchError(error => {
          console.error('account not found: ', error);
          this.accountFound.set(false);
          return of(null);
        }),
        finalize(() => this.loading.set(false)));
    })).subscribe({
      next: (response) => {
        this.account.next(response);
        this.accountFound.set(true);
      }
    })
  }

  initializeOTPSubscription(): void {
    this._SendOTPClick$.pipe(exhaustMap(() => {
      this.loading.set(true);
      return this._AuthService.sendResetPasswordCode(this.account.value?.id!).pipe(
        catchError(error => {
          console.error('error sending otp', error);
          return of(null);
        }),
        finalize(() => this.loading.set(false)));
    })).subscribe({
      next: (response) => {
        // change ui to OTP
        console.log('response: ', response);
      }
    })
  }

  submitEmailForm() {
    if (this.emailForm.status == 'VALID')
      this._EmailFormClick$.next()
  }

  sendResetPasswordCode = () => this._SendOTPClick$.next();

  useDifferentEmail = () => this.accountFound.set(undefined);

  maskEmail = (email: string): string => Helper.maskEmail(email);
}

/**

 */