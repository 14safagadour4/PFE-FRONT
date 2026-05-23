import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importer TON composant users existant
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UsersComponent,
  ],
})
export class UsersModule {}
