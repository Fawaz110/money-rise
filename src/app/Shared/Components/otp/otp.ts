import { Component, ElementRef, inject, Input, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../Features/Auth/Services/auth.service';
import { catchError, exhaustMap, finalize, of, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  selector: 'app-otp',
  styleUrl: './otp.scss',
  templateUrl: './otp.html',
})
export class Otp implements OnInit {
  _AuthService = inject(AuthService);
  _Router = inject(Router)
  _OTPClick$ = new Subject<void>();
  protected otp: string[] = ['', '', '', '', '', ''];
  @Input() id!: string
  @ViewChildren('otpInp') private readonly otpInputs!: QueryList<ElementRef<HTMLInputElement>>
  loading = signal(false);

  ngOnInit(): void {

  }

  initializeOTPClickSubscription(): void {
    this._OTPClick$.pipe(exhaustMap(() => {
      this.loading.set(true);
      const model = {
        id: this.id,
        code: this.otp.join('')
      }
      return this._AuthService.confirmCode(model).pipe(
        catchError(error => {
          console.error('login failed: ', error);
          return of(null);
        }),
        finalize(() => this.loading.set(false)));
    })).subscribe({
      next: (response) => {
        this._AuthService.otp.next(this.otp.join(''));
        this._Router.navigate(['/reset-password']);
      }
    })
  }

  submitCode() {
    if (!this.otp.includes('')) {
      console.log(this.otp.join(''));
    }
  }

  protected onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    // Keep only numbers
    const value = input.value.replace(/\D/g, '').slice(-1);

    this.otp[index] = value;
    input.value = value;

    // Move to next input when digit entered
    if (value && index < this.otp.length - 1) {
      this.focusInput(index + 1);
    }
  }

  protected onOtpKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      event.preventDefault();

      // If current input has a value, clear it
      if (this.otp[index]) {
        this.otp[index] = '';
        input.value = '';
        return;
      }

      // If current input is empty, go to previous
      if (index > 0) {
        this.otp[index - 1] = '';

        this.focusInput(index - 1);

        const previousInput =
          this.otpInputs.get(index - 1)?.nativeElement;

        if (previousInput) {
          previousInput.value = '';
        }
      }
    }

    // Optional: Arrow navigation
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    }

    if (
      event.key === 'ArrowRight' &&
      index < this.otp.length - 1
    ) {
      event.preventDefault();
      this.focusInput(index + 1);
    }
  }

  protected onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const pastedValue = event.clipboardData?.getData('text') ?? '';

    const digits = pastedValue.replace(/\D/g, '').slice(0, this.otp.length);

    if (!digits)
      return;

    // Fill OTP array
    this.otp = this.otp.map((_, index) => digits[index] ?? '');

    // Update inputs
    this.otpInputs.forEach((input, index) => {
      input.nativeElement.value = this.otp[index];
    });

    // Focus next empty input or last input
    const nextEmptyIndex = this.otp.findIndex(value => !value);
    const focusIndex = nextEmptyIndex === -1 ? this.otp.length - 1 : nextEmptyIndex;

    this.focusInput(focusIndex);
  }

  private focusInput(index: number): void {
    setTimeout(() => {
      this.otpInputs
        .get(index)
        ?.nativeElement.focus();
    });
  }

  protected getOtp = (): string => this.otp.join('');
}
