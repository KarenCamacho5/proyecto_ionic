import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  },
  {
    path: 'product-list',
    loadComponent: () => import('./product-list/product-list.page').then( m => m.ProductListPage)
  },
  {
    path: 'report',
    loadComponent: () => import('./report/report.page').then( m => m.ReportPage)
  },
];
