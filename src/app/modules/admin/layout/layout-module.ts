import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importer le routing
import { LayoutRoutingModule } from './layout-routing-module';

// Importer TON layout component (déjà existant)
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, LayoutRoutingModule, LayoutComponent],
  exports: [
    LayoutComponent,
  ],
})
export class LayoutModule {}
