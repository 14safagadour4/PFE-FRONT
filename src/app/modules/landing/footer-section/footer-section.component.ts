import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.css',
  standalone: false,
})
export class FooterSectionComponent {
  year = new Date().getFullYear();

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
