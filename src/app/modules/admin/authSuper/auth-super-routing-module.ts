import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {registrationGuard} from '../../../core/guards/registration.guard';
// Importer les composants
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MagicLoginComponent } from './magic-login/magic-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'magic-login', component: MagicLoginComponent },
  { path: 'register', redirectTo: 'login', pathMatch: 'full' }, // ← redirect vers login
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthSuperRoutingModule {}
