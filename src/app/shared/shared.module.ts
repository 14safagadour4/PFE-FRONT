import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ========== COMPOSANTS PARTAGÉS ==========
// À importer au fur et à mesure que tu les crées
// import { HeaderComponent } from './components/header/header.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { StatCardComponent } from './components/stat-card/stat-card.component';
// import { DataTableComponent } from './components/data-table/data-table.component';
// import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
// import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

// ========== DIRECTIVES ==========
// import { HasPermissionDirective } from './directives/has-permission.directive';

// ========== PIPES ==========
// import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    // Déclare tous tes composants partagés ici
    // HeaderComponent,
    // SidebarComponent,
    // StatCardComponent,
    // DataTableComponent,
    // LoadingSpinnerComponent,
    // ConfirmationDialogComponent,
    // HasPermissionDirective,
    // TruncatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // EXPORTE les modules pour qu'ils soient disponibles partout
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    // EXPORTE les composants partagés
    // HeaderComponent,
    // SidebarComponent,
    // StatCardComponent,
    // DataTableComponent,
    // LoadingSpinnerComponent,
    // ConfirmationDialogComponent,
    // HasPermissionDirective,
    // TruncatePipe
  ]
})
export class SharedModule { }