import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { superAdminGuard } from './core/guards/super-admin.guard';
import { registrationGuard } from './core/guards/registration.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
        // canActivate: [registrationGuard]  ← mets en commentaire
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        //canActivate: [authGuard],
        loadComponent: () => import('./features/layout/layout.component')
            .then(m => m.LayoutComponent),
        children: [
            { path: '', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'activities', loadComponent: () => import('./features/activities/activities.component').then(m => m.ActivitiesComponent) },
            { path: 'users', loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent) },
            { path: 'specialists', loadComponent: () => import('./features/specialists/specialists.component').then(m => m.SpecialistsComponent) },
            { path: 'therapists', loadComponent: () => import('./features/therapists/therapists.component').then(m => m.TherapistsComponent) },
            { path: 'content', loadComponent: () => import('./features/content/content.component').then(m => m.ContentComponent) },
            {
                path: 'partners',
                //canActivate: [superAdminGuard],
                loadComponent: () => import('./features/partners/partners.component').then(m => m.PartnersComponent)
            },
            {
                path: 'roles',
                //canActivate: [superAdminGuard],
                loadComponent: () => import('./features/roles/roles.component').then(m => m.RolesComponent)
            },
            {
                path: 'settings',
                //canActivate: [superAdminGuard],
                loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
            },
        ]
    },
    { path: '**', redirectTo: '/dashboard' }
];
