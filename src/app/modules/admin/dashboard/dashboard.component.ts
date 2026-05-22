import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private svc = inject(DashboardService);

  stats = signal<any>(null);
  aiStats = signal<any>(null);
  logs = signal<any[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadData();
    this.loadAIStats();
  }

  loadData(): void {
    this.loading.set(true);
    // Simuler des données pour l'instant (à remplacer par de vrais appels plus tard)
    setTimeout(() => {
      this.stats.set({
        totalUsers: 1250,
        totalSpecialists: 48,
        totalPartners: 23,
        totalContent: 156
      });

      this.logs.set([
        { id: 1, time: '2m', action: 'Nouvel utilisateur inscrit', details: 'Sara Belkacem a créé un compte' },
        { id: 2, time: '15m', action: 'Spécialiste validé', details: 'Dr. Hadj Mansouri – Psychologue' },
        { id: 3, time: '1h', action: 'Contenu ajouté', details: '"Initiation à la peinture thérapeutique"' }
      ]);
      this.loading.set(false);
    }, 1000);
  }

  loadAIStats(): void {
    this.svc.getAIStats().subscribe({
      next: (data) => {
        this.aiStats.set(data);
      },
      error: (err) => console.error("Error loading AI stats", err)
    });
  }

  refreshData(): void {
    this.loadData();
    this.loadAIStats();
  }
}
