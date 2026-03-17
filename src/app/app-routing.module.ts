import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redirection par défaut
  { path: '', redirectTo: '/admin/authSuper/register', pathMatch: 'full' },

  // Module Admin (TOUT ton backoffice)
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },

  // Page 404 — redirectTo vers login, PAS vers /404 !
  { path: '**', redirectTo: '/admin/authSuper/register' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
