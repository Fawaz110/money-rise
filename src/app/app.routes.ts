import { Routes } from '@angular/router';
import { authGuard } from './Layouts/auth.layout/auth-guard';
import { mainGuard } from './Layouts/main.layout/main-guard';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [mainGuard],
        loadComponent: () => import('./Layouts/main.layout/main.layout').then(layout => layout.MainLayout),
        loadChildren: () => import('./Layouts/main.layout/main.layout.routes').then(m => m.MAIN_LAYOUT_ROUTES)
    },
    {
        path: 'auth',
        // canActivate: [authGuard],
        loadComponent: () => import('./Layouts/auth.layout/auth.layout').then(layout => layout.AuthLayout),
        loadChildren: () => import('./Layouts/auth.layout/auth.layout.routes').then(m => m.AUTH_LAYOUT_ROUTES)
    },
    {path: '**', loadComponent: () => import('./Shared/Pages/not-found/not-found').then(page => page.NotFound) },
];
