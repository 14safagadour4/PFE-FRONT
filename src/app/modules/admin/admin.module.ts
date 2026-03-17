import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Tu peux ajouter un layout si tu en as un
 //import { LayoutComponent } from './layout/layout.component;

@NgModule({
  declarations: [
    // LayoutComponent  // ← Si tu as un layout
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
