import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private svc = inject(DashboardService);

  stats = signal<any>(null);
  logs = signal<any[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    // Simuler des données pour l'instant
    setTimeout(() => {
      this.stats.set({
        totalUsers: 1250,
        totalSpecialists: 48,
        totalPartners: 23,
        totalContent: 156
      });

      this.logs.set([
        {
          id: 1,
          time: '2m',
          action: 'Nouvel utilisateur inscrit',
          details: 'Sara Belkacem a créé un compte'
        },
        {
          id: 2,
          time: '15m',
          action: 'Spécialiste validé',
          details: 'Dr. Hadj Mansouri – Psychologue'
        },
        {
          id: 3,
          time: '1h',
          action: 'Contenu ajouté',
          details: '"Initiation à la peinture thérapeutique"'
        },
        {
          id: 4,
          time: '3h',
          action: 'Admin créé via Management',
          details: 'Amira Tounsi – Admin Contenu'
        },
        {
          id: 5,
          time: '5h',
          action: 'Tentative connexion échouée',
          details: '3 tentatives – IP: 41.200.x.x'
        }
      ]);

      this.loading.set(false);
    }, 1000);
  }

  refreshData(): void {
    this.loadData();
  }
}