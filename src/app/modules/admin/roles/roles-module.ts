import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importer TON composant users existant
import { RolesComponent } from './roles.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RolesRoutingModule,
    RolesComponent,
  ],
})
export class RolesModule {}
