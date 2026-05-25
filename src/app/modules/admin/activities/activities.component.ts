import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ActivityLog {
  id: number;
  action: string;
  description: string;
  performedBy: string;
  role: string;
  targetType?: string;
  targetId?: number;
  ip?: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
}

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  logs: ActivityLog[] = [];
  filtered: ActivityLog[] = [];
  loading = true;
  searchTerm = '';
  severityFilter = 'ALL';
  page = 0;
  pageSize = 15;
  totalPages = 1;

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    setTimeout(() => {
      this.logs = this.mockData();
      this.applyFilters();
      this.loading = false;
    }, 500);
  }

  applyFilters() {
    let list = this.logs.filter(l => {
      const matchSearch = !this.searchTerm ||
        `${l.action} ${l.description} ${l.performedBy}`
          .toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchSeverity = this.severityFilter === 'ALL' || l.severity === this.severityFilter;
      return matchSearch && matchSeverity;
    });
    this.totalPages = Math.ceil(list.length / this.pageSize);
    this.filtered = list.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);
  }

  prevPage() { if (this.page > 0) { this.page--; this.applyFilters(); } }
  nextPage() { if (this.page < this.totalPages - 1) { this.page++; this.applyFilters(); } }

  severityIcon(s: string) {
    return { INFO: 'ℹ️', WARNING: '⚠️', ERROR: '🔴', SUCCESS: '✅' }[s] || 'ℹ️';
  }

  mockData(): ActivityLog[] {
    const actions = [
      { action: 'LOGIN', desc: 'Connexion réussie', sev: 'SUCCESS' as const },
      { action: 'REGISTER', desc: 'Inscription Super Admin', sev: 'SUCCESS' as const },
      { action: 'VALIDATE_SPECIALIST', desc: 'Spécialiste validé', sev: 'SUCCESS' as const },
      { action: 'BLOCK_USER', desc: 'Utilisateur bloqué', sev: 'WARNING' as const },
      { action: 'CREATE_PARTNER', desc: 'Partenaire créé', sev: 'INFO' as const },
      { action: 'DELETE_PARTNER', desc: 'Partenaire supprimé', sev: 'WARNING' as const },
      { action: 'FAILED_LOGIN', desc: 'Tentative de connexion échouée', sev: 'ERROR' as const },
      { action: 'UPDATE_ROLE', desc: 'Rôle mis à jour', sev: 'INFO' as const },
    ];
    return Array.from({ length: 40 }, (_, i) => {
      const a = actions[i % actions.length];
      return {
        id: i + 1,
        action: a.action,
        description: a.desc,
        performedBy: i % 3 === 0 ? 'Super Admin' : `Partner ${(i % 4) + 1}`,
        role: i % 3 === 0 ? 'SUPER_ADMIN' : 'PARTNER',
        ip: `192.168.1.${(i % 50) + 10}`,
        timestamp: new Date(Date.now() - i * 3600000 * 2).toISOString(),
        severity: a.sev,
      };
    });
  }
}