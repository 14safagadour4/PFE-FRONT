import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivitiesComponent } from './activities.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    ActivitiesComponent,
  ],
})
export class ActivitiesModule {}
