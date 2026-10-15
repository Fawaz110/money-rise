import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../Services/auth.service';
import { matchFields } from '../../Validators/match-fields.validator';
import { NgClass } from '@angular/common';

@Component({
  imports: [
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  selector: 'app-reset-password-page',
  styleUrl: './reset-password.page.scss',
  templateUrl: './reset-password.page.html',
})
export class ResetPasswordPage implements OnInit {
  _AuthService = inject(AuthService);
  _FormBuilder = inject(FormBuilder);
  form!: FormGroup;
  typing = signal(false);
  // meetRequirments: boolean[] = [false, false, false, false];
  meetRequirements: {
    atLeast6Characters: boolean,
    OneUppercase: boolean,
    OneNumber: boolean,
    OneSpecialCharacter: boolean
  } = {
      atLeast6Characters: false,
      OneUppercase: false,
      OneNumber: false,
      OneSpecialCharacter: false
    };
  typingTimeOut: any
  ngOnInit(): void {
    this.form = this._FormBuilder.group({
      new: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,20}$/)]],
      confirm: ['', [Validators.required]],
    }, { validators: matchFields('new', 'confirm') })
  }

  startTyping() {
    clearTimeout(this.typingTimeOut);
    this.typing.set(true);
    this.typingTimeOut = setTimeout(() => {
      this.checkPasswordRequirements(this.form.get('new')?.value)
      this.typing.set(false);
    }, 500);
  }

  checkPasswordRequirements(password: string) {
    this.meetRequirements = {
      atLeast6Characters: password.length >= 6,
      OneUppercase: /[A-Z]/.test(password),
      OneNumber: /\d/.test(password),
      OneSpecialCharacter: /[^a-zA-Z0-9\s]/.test(password)
    };
  }

  submit() {
    if (this.form.status === 'VALID') {
      
    }
  }
}
