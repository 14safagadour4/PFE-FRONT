import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importer TON composant users existant
import { ContentComponent } from './content.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ContentComponent,
  ],
})
export class ContentModule {}
