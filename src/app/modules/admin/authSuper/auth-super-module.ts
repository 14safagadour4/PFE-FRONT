import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importer le routing
import { AuthSuperRoutingModule } from './auth-super-routing-module';

// Importer les composants
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Importer les modules partagés (si besoin)
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthSuperRoutingModule,
    LoginComponent,
    RegisterComponent,
    // ← optionnel, si tu as des composants partagés
  ],
})
export class AuthSuperModule {}
