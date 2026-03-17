import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TherapistsRoutingModule } from './therapists-routing-module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TherapistsComponent } from './therapists.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TherapistsRoutingModule,
    TherapistsComponent,
  ],
})
export class TherapistsModule {}
