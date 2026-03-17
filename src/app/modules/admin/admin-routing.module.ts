import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {superAdminGuard} from '../../core/guards/super-admin.guard';

const routes: Routes = [
  // ── Auth — SANS layout ─────────────────────────
  {
    path: 'authSuper',
    loadChildren: () => import('./authSuper/auth-super-module').then((m) => m.AuthSuperModule),
  },

  // ── Dashboard — AVEC layout ────────────────────
  {
    path: '',
    component: LayoutComponent,
    canActivate: [superAdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users-module').then((m) => m.UsersModule),
      },
      {
        path: 'specialists',
        loadChildren: () =>
          import('./specialists/specialists-module').then((m) => m.SpecialistsModule),
      },
      {
        path: 'therapists',
        loadChildren: () =>
          import('./therapists/therapists-module').then((m) => m.TherapistsModule),
      },
      {
        path: 'partners',
        loadChildren: () => import('./partners/partners-module').then((m) => m.PartnersModule),
      },
      {
        path: 'content',
        loadChildren: () => import('./content/content-module').then((m) => m.ContentModule),
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles-module').then((m) => m.RolesModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings-module').then((m) => m.SettingsModule),
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./activities/activities-module').then((m) => m.ActivitiesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
