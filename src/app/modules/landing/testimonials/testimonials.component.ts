import { Component } from '@angular/core';

interface Testimonial {
  stars: string;
  text: string;
  initial: string;
  name: string;
  city: string;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
  standalone: false,
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      stars: '★★★★★',
      text: "CARTAS a changé ma façon d'aborder ma santé. L'herbier est incroyablement détaillé et l'IA Tawhida m'a aidée à trouver des solutions pour mes migraines chroniques.",
      initial: 'R',
      name: 'Rim B.',
      city: 'Tunis',
    },
    {
      stars: '★★★★★',
      text: "Enfin une application qui respecte notre patrimoine naturel tunisien. Le Virtual Phyto Lab est génial, j'ai créé ma propre tisane personnalisée !",
      initial: 'F',
      name: 'Fatma A.',
      city: 'Sfax',
    },
    {
      stars: '★★★★★',
      text: "L'Espace Rachma est une révélation. Les séances d'art-thérapie guidées par Salma m'ont vraiment aidée à gérer mon stress quotidien.",
      initial: 'M',
      name: 'Mariem S.',
      city: 'Sousse',
    },
  ];
}
