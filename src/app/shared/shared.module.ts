// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nl2brPipe } from './nl2br-pipe'; // ← Match the actual filename

@NgModule({
  declarations: [Nl2brPipe],
  imports: [CommonModule],
  exports: [Nl2brPipe],
})
export class SharedModule {}
