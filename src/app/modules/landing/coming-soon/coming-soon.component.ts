import { Component } from '@angular/core';

interface ComingModule {
  icon: string;
  name: string;
  desc: string;
}

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css',
  standalone: false,
})
export class ComingSoonComponent {
  modules: ComingModule[] = [
    {
      icon: '🩺',
      name: 'Consultation',
      desc: 'Prenez RDV avec des spécialistes certifiés et consultez en visioconférence depuis chez vous.',
    },
    {
      icon: '🛍️',
      name: 'Boutique',
      desc: 'Sélection de produits phytothérapeutiques certifiés — huiles, tisanes, packs naturels.',
    },
    {
      icon: '💬',
      name: 'Forum',
      desc: "Rejoignez la communauté : partagez, posez vos questions, échangez avec d'autres utilisatrices.",
    },
    {
      icon: '📚',
      name: 'Programme Éducatif',
      desc: 'Modules de formation, leçons interactives, quiz et badges pour approfondir vos connaissances.',
    },
  ];
}
