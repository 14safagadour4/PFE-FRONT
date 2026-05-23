import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importer TON composant users existant
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SettingsComponent,
  ],
})
export class SettingsModule {}
