import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

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
  private _FormBuilder = inject(FormBuilder)
  _LoginForm!: FormGroup
  isLoading = signal(false)
  showPassword = signal(false)

  ngOnInit(): void {
    this._LoginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]]
    })
  }

  submitLoginForm() {
    this.isLoading.set(true)
    if(this._LoginForm.status === "VALID") {
      this.login();
    }
    else
      this.isLoading.set(false)
  }

  togglePassword = () => this.showPassword.set(!this.showPassword());

  login() {
    this.isLoading.set(false) 
  }
}
