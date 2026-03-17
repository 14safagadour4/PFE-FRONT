import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TherapistsComponent } from './therapists.component';

const routes: Routes = [{ path: '', component: TherapistsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TherapistsRoutingModule {}
