import { Component } from '@angular/core';

@Component({
  selector: 'app-herbier-section',
  templateUrl: './herbier-section.component.html',
  styleUrl: './herbier-section.component.css',
  standalone: false,
})
export class HerbierSectionComponent {
  plants = [
    {
      emoji: '🌱',
      name: 'Nigelle',
      sci: 'Nigella sativa',
      benefit: 'Immunité, anti-inflammatoire, digestion, antibactérien',
      tag: 'HABBATUS SAUDA',
    },
    {
      emoji: '🌺',
      name: 'Hibiscus',
      sci: 'Hibiscus sabdariffa',
      benefit: 'Tension artérielle, antioxydant, diurétique, vitamine C',
      tag: 'KARKADÉ',
    },
    {
      emoji: '🌿',
      name: 'Menthe',
      sci: 'Mentha piperita',
      benefit: 'Digestion, maux de tête, antiseptique, rafraîchissant',
      tag: "NA'NA",
    },
    {
      emoji: '💜',
      name: 'Lavande',
      sci: 'Lavandula angustifolia',
      benefit: 'Relaxation, insomnie, anxiété, cicatrisant',
      tag: 'KHZAMA',
    },
    {
      emoji: '🌼',
      name: 'Camomille',
      sci: 'Matricaria chamomilla',
      benefit: 'Anti-inflammatoire, crampes menstruelles, digestion',
      tag: 'BABOUNIJ',
    },
  ];
}
