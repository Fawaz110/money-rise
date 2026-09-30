import { Routes } from "@angular/router";

export const MAIN_LAYOUT_ROUTES: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', loadComponent: () => import('../../Features/Overview/Pages/overview.page/overview.page').then(page => page.OverviewPage) },
    { path: 'transactions', loadComponent: () => import('../../Features/Transactions/Pages/transactions.page/transactions.page').then(page => page.TransactionsPage) },
    { path: 'budgets', loadComponent: () => import('../../Features/Budgets/Pages/budgets.page/budgets.page').then(page => page.BudgetsPage) },
]