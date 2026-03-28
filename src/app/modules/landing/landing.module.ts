import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { ModulesSectionComponent } from './modules-section/modules-section.component';
import { HerbierSectionComponent } from './herbier-section/herbier-section.component';
import { SpecialistsSectionComponent } from './specialists-section/specialists-section.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { DownloadSectionComponent } from './download-section/download-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { RouterModule } from '@angular/router';
import { BirdChatbotComponent } from './bird-chatbot/bird-chatbot.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { IntroComponent } from './intro-section/intro.component';
@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    HeroComponent,
    ModulesSectionComponent,
    HerbierSectionComponent,
    SpecialistsSectionComponent,
    ComingSoonComponent,
    TestimonialsComponent,
    DownloadSectionComponent,
    FooterSectionComponent,
    BirdChatbotComponent,
    IntroComponent,
    // ✅ Plus de Nl2brPipe ici !
  ],
  imports: [CommonModule, SharedModule, FormsModule, RouterModule, LandingRoutingModule],
})
export class LandingModule {}
