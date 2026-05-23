import { Component } from '@angular/core';

interface AppModule {
  icon: string;
  tag: string;
  name: string;
  desc: string;
  badge: string;
}

@Component({
  selector: 'app-modules-section',
  templateUrl: './modules-section.component.html',
  styleUrl: './modules-section.component.css',
  standalone: false,
})
export class ModulesSectionComponent {
  modules: AppModule[] = [
    {
      icon: '🌿',
      tag: 'Herbier Digital',
      name: 'Herbier Khaïel',
      desc: '340 plantes médicinales tunisiennes avec propriétés, dosages et contre-indications détaillées.',
      badge: '📱 Disponible offline',
    },
    {
      icon: '📷',
      tag: 'Réalité Augmentée',
      name: 'Scanner Khaïel',
      desc: 'Scannez les cartes AR pour identifier instantanément les plantes grâce à la caméra de votre téléphone.',
      badge: '🔬 IA intégrée',
    },
    {
      icon: '🎨',
      tag: 'Art-Thérapie',
      name: 'Espace Rachma',
      desc: "Séances guidées d'art-thérapie pour le bien-être émotionnel et la résilience féminine au quotidien.",
      badge: '🎭 Guidé par thérapeutes',
    },
    {
      icon: '🔬',
      tag: 'Laboratoire Virtuel',
      name: 'Virtual Phyto Lab',
      desc: 'Créez vos remèdes personnalisés — tisanes, huiles, macérats — guidé par des formules validées.',
      badge: '⚗️ Formules validées',
    },
    {
      icon: '🤖',
      tag: 'Intelligence Artificielle',
      name: 'IA Tawhida+',
      desc: 'Assistant multilingue (Derja/FR/EN) qui recommande des solutions naturelles personnalisées en temps réel.',
      badge: '🧠 TensorFlow Lite',
    },
    {
      icon: '🗺️',
      tag: 'Gamification',
      name: 'Tri9 el Kenz',
      desc: 'Parcours gamifié de découverte des plantes. Complétez des quêtes, gagnez des XP et des badges.',
      badge: '🏆 Quêtes & Badges',
    },
  ];
}
