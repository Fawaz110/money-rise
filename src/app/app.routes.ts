import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./Layouts/main.layout/main.layout').then(layout => layout.MainLayout),
        loadChildren: () => import('./Layouts/main.layout/main.layout.routes').then(m => m.MAIN_LAYOUT_ROUTES)
    },
    {
        path: 'auth',
        loadComponent: () => import('./Layouts/auth.layout/auth.layout').then(layout => layout.AuthLayout),
        loadChildren: () => import('./Layouts/auth.layout/auth.layout.routes').then(m => m.AUTH_LAYOUT_ROUTES)
    },
    {path: '**', loadComponent: () => import('./Shared/Pages/not-found/not-found').then(page => page.NotFound) },
];
