import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

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
  protected otp: string[] = ['', '', '', '', '', ''];
  @ViewChildren('otpInp') private readonly otpInputs!: QueryList<ElementRef<HTMLInputElement>>
  ngOnInit(): void {
    
  }

  submitCode() {
    console.log(this.otp.join(''));
    
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

  protected onOtpKeydown(
    event: KeyboardEvent,
    index: number
  ): void {
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
    const focusIndex = nextEmptyIndex === -1? this.otp.length - 1 : nextEmptyIndex;

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
