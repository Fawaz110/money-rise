import { Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Avatar } from '../../../../Shared/Components/avatar/avatar';
import { Otp } from '../../../../Shared/Components/otp/otp';

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
  _FormBuilder = inject(FormBuilder)
  @ViewChild('recoveryForm') recoveryFormRef!: ElementRef<HTMLDivElement>
  @ViewChild('recoveryAccount') recoveryAccountRef!: ElementRef<HTMLDivElement>
  @ViewChild('otpForm') otpFormRef!: ElementRef<HTMLDivElement>
  resetPasswordSent = signal(false);
  loading = signal(false);
  accountFound: WritableSignal<boolean | undefined> = signal(undefined);
  emailForm!: FormGroup

  ngOnInit(): void {
    this.emailForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
    console.log('email form: ', this.emailForm);

  }

  submitEmailForm() {
    const value = this.emailForm.get('email')?.value as string;

    if (value.includes('@found')) {
      this.accountFound.set(true);
    } else if (value.includes('@not-found')) {
      this.accountFound.set(false);
    } else {
      this.accountFound.set(undefined);
    }
    // if (this.emailForm.status == 'VALID') {

    // }
  }
  
  useDiffirentEmail() {
    this.accountFound.set(undefined);
  }
}
