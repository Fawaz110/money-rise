import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

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
  _SignupForm!: FormGroup
  isLoading = signal(false)
  showPassword = signal(false)

  ngOnInit(): void {
    this._SignupForm = this._FormBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.max(50), Validators.pattern(/^[A-Za-z\u0600-\u06FF]+(?: [A-Za-z\u0600-\u06FF]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+2)?01[0125][0-9]{8}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]]
    })
  }

  submitSignupForm() {
    this.isLoading.set(true)
    if(this._SignupForm.status === "VALID") {
      this.signup();
    }
    else
      this.isLoading.set(false)
  }

  togglePassword = () => this.showPassword.set(!this.showPassword());

  signup() {

  }
}
