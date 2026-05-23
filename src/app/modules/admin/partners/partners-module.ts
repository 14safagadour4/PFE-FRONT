import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersRoutingModule } from './partners-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importer TON composant users existant
import { PartnersComponent } from './partners.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    PartnersComponent,
  ],
})
export class PartnersModule {}
