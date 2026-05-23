import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpecialistsRoutingModule} from './specialists-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importer TON composant users existant
import { SpecialistsComponent } from './specialists.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpecialistsRoutingModule,
    SpecialistsComponent,
  ],
})
export class SpecialistsModule {}
