import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { AppUser, Page } from '../../../core/models';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  private svc = inject(UserService);

  page = signal<Page<AppUser> | null>(null);
  users = signal<AppUser[]>([]);
  activeTab = signal<string | undefined>(undefined);
  loading = signal(true);

  tabs = [
    { label: 'Tous', status: undefined },
    { label: 'Actifs', status: 'ACTIVE' },
    { label: 'Bloqués', status: 'BLOCKED' },
  ];

  ngOnInit(): void { this.load(); }

  load(p = 0): void {
    this.loading.set(true);
    this.svc.getAll(this.activeTab(), p).subscribe(r => {
      if (r.success) { this.page.set(r.data); this.users.set(r.data.content); }
      this.loading.set(false);
    });
  }

  switchTab(status: string | undefined): void {
    this.activeTab.set(status); this.load();
  }

  validate(id: number): void { this.svc.validate(id).subscribe(() => this.load()); }
  block(id: number): void { this.svc.block(id).subscribe(() => this.load()); }
  unblock(id: number): void { this.svc.unblock(id).subscribe(() => this.load()); }

  statusLabel(s: string): string {
    return ({ ACTIVE: 'Actif', BLOCKED: 'Bloqué', DELETED: 'Supprimé' } as any)[s] ?? s;
  }

  initials(u: AppUser): string {
    const f = u?.firstName?.[0] || '';
    const l = u?.lastName?.[0] || '';
    return (f + l).toUpperCase() || 'U';
  }
}
