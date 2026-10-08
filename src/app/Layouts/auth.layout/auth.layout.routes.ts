import { Routes } from "@angular/router";

export const AUTH_LAYOUT_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('../../Features/Auth/Pages/signup.page/signup.page').then(page => page.SignupPage) },
    { path: 'login', loadComponent: () => import('../../Features/Auth/Pages/login.page/login.page').then(page => page.LoginPage) },
    { path: 'recovery', loadComponent: () => import('../../Features/Auth/Pages/recovery.page/recovery.page').then(page => page.RecoveryPage) },
    { path: 'reset-password', loadComponent: () => import('../../Features/Auth/Pages/reset-password.page/reset-password.page').then(page => page.ResetPasswordPage) },
]
