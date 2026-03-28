import { Component } from '@angular/core';

@Component({
  selector: 'app-specialists-section',
  templateUrl: './specialists-section.component.html',
  styleUrl: './specialists-section.component.css',
  standalone: false,
})
export class SpecialistsSectionComponent {
  specialists = [
    {
      initial: 'A',
      name: 'Dr. Amel Ben Ali',
      role: 'Naturopathe Certifiée',
      bio: "Spécialiste en phytothérapie traditionnelle tunisienne avec 12 ans d'expérience clinique.",
      note: '4.9',
      patients: '340',
    },
    {
      initial: 'N',
      name: 'Nadia Cherif',
      role: 'Herboriste & Aromathérapeute',
      bio: 'Experte en huiles essentielles et formulations naturelles sur mesure pour chaque profil.',
      note: '4.8',
      patients: '218',
    },
    {
      initial: 'Y',
      name: 'Yasmine Hadj',
      role: 'Diététicienne Naturopathe',
      bio: 'Accompagnement en nutrition holistique et phytothérapie préventive depuis 8 ans.',
      note: '4.9',
      patients: '195',
    },
    {
      initial: 'S',
      name: 'Salma Tounsi',
      role: 'Art-Thérapeute',
      bio: "Thérapie par l'art pour le bien-être émotionnel et la résilience féminine au quotidien.",
      note: '5.0',
      patients: '87',
    },
  ];
}
