import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityLogService } from '../../../core/services/activity-log.service';

export interface UIActivityLog {
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
  private activityLogService = inject(ActivityLogService);

  logs: UIActivityLog[] = [];
  filtered: UIActivityLog[] = [];
  loading = true;
  searchTerm = '';
  severityFilter = 'ALL';
  page = 0;
  pageSize = 15;
  totalPages = 1;

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.activityLogService.getAll(this.page, this.pageSize, this.searchTerm).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const rawLogs = res.data.content || [];
          this.logs = rawLogs.map(l => ({
            id: l.id,
            action: l.action,
            description: this.getActionDescription(l),
            performedBy: l.actorName || 'Super Admin',
            role: l.actorType || 'SUPER_ADMIN',
            targetType: l.targetType,
            targetId: l.targetId,
            ip: l.ipAddress || '',
            timestamp: l.createdAt,
            severity: this.determineSeverity(l.action)
          }));
          this.totalPages = res.data.totalPages || 1;
          this.applyFilters();
        } else {
          this.logs = [];
          this.filtered = [];
          this.totalPages = 1;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des activités :', err);
        this.logs = [];
        this.filtered = [];
        this.totalPages = 1;
        this.loading = false;
      }
    });
  }

  applyFilters() {
    if (this.severityFilter === 'ALL') {
      this.filtered = this.logs;
    } else {
      this.filtered = this.logs.filter(l => l.severity === this.severityFilter);
    }
  }

  onSearchChange() {
    this.page = 0;
    this.load();
  }

  onSeverityChange(filter: string) {
    this.severityFilter = filter;
    this.applyFilters();
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.load();
    }
  }

  severityIcon(s: string) {
    return { INFO: 'ℹ️', WARNING: '⚠️', ERROR: '🔴', SUCCESS: '✅' }[s] || 'ℹ️';
  }

  determineSeverity(action: string): 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS' {
    const act = (action || '').toUpperCase();
    if (act.includes('VALIDATED') || act.includes('UNBLOCKED') || act.includes('SUCCESS') || act.includes('ACTIVATED') || act.includes('LOGIN')) {
      return 'SUCCESS';
    }
    if (act.includes('FAILED')) {
      return 'ERROR';
    }
    if (act.includes('BLOCKED') || act.includes('REFUSED') || act.includes('DELETED') || act.includes('DEACTIVATED')) {
      return 'WARNING';
    }
    return 'INFO';
  }

  getActionDescription(log: any): string {
    if (log.details && log.details.trim()) {
      return log.details;
    }
    const mapping: Record<string, string> = {
      USER_VALIDATED: 'Utilisateur validé',
      USER_BLOCKED: 'Utilisateur bloqué',
      USER_UNBLOCKED: 'Utilisateur réactivé',
      PARTNER_CREATED: 'Partenaire créé',
      PARTNER_ACTIVATED: 'Partenaire activé',
      PARTNER_DEACTIVATED: 'Partenaire désactivé',
      PARTNER_DELETED: 'Partenaire supprimé',
      PARTNER_ROLE_CHANGED: 'Rôle du partenaire mis à jour',
      SPECIALIST_VALIDATED: 'Spécialiste validé',
      SPECIALIST_REFUSED: 'Spécialiste refusé',
      ART_THERAPIST_VALIDATED: 'Art-Thérapeute validé',
      ART_THERAPIST_REFUSED: 'Art-Thérapeute refusé',
    };
    return mapping[log.action] || log.action || 'Action effectuée';
  }
}