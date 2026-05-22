import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ManagementModalComponent } from '../management/management.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ManagementModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  auth = inject(AuthService);
  router = inject(Router);

  sidenavOpen = signal(true);
  mgmtOpen = signal(false);
  currentPage = signal('Dashboard');
  isDark = computed(() => this.auth.theme() === 'dark');

  user = this.auth.currentUser;
  initials = computed(() => {
    const u = this.user();
    if (!u) return 'SA';
    return (u.firstName[0] + u.lastName[0]).toUpperCase();
  });

  allItems = [
    {
      ico: '🏠',
      label: 'Dashboard',
      route: '/admin/dashboard',
      section: 'Principal',
      badge: '',
      badgeType: '',
      roles: ['SUPER_ADMIN', 'ADMIN_CONTENU', 'ADMIN_UTILISATEURS', 'ADMIN_LECTURE'],
    },
    {
      ico: '⚡',
      label: 'Activités',
      route: '/admin/activities',
      section: 'Principal',
      badge: '12',
      badgeType: 'g',
      roles: ['SUPER_ADMIN', 'ADMIN_CONTENU', 'ADMIN_UTILISATEURS', 'ADMIN_LECTURE'],
    },
    {
      ico: '👥',
      label: 'Utilisateurs',
      route: '/admin/users',
      section: 'Gestion',
      badge: '3',
      badgeType: 'r',
      roles: ['SUPER_ADMIN', 'ADMIN_UTILISATEURS'],
    },
    {
      ico: '🩺',
      label: 'Spécialistes',
      route: '/admin/specialists',
      section: 'Gestion',
      badge: '',
      badgeType: '',
      roles: ['SUPER_ADMIN', 'ADMIN_UTILISATEURS'],
    },
    {
      ico: '🎭',
      label: 'Art-Thérapeutes',
      route: '/admin/therapists',
      section: 'Gestion',
      badge: '',
      badgeType: '',
      roles: ['SUPER_ADMIN', 'ADMIN_UTILISATEURS'],
    },
    {
      ico: '🤝',
      label: 'Partenaires',
      route: '/admin/partners',
      section: 'Gestion',
      badge: '',
      badgeType: '',
      roles: ['SUPER_ADMIN'],
    },
    {
      ico: '📚',
      label: 'Contenu Éducatif',
      route: '/admin/content',
      section: 'Contenu & Système',
      badge: '',
      badgeType: '',
      roles: ['SUPER_ADMIN', 'ADMIN_CONTENU'],
    },
    {
      ico: '🔐',
      label: 'Rôles',
      route: '/admin/roles',
      section: 'Contenu & Système',
      badge: '',
      badgeType: '',
      roles: ['SUPER_ADMIN'],
    },
    {
      ico: '⚙️',
      label: 'Paramètres',
      route: '/admin/settings',
      section: 'Contenu & Système',
      badge: '',
      badgeType: '',
      roles: ['SUPER_ADMIN', 'ADMIN_CONTENU', 'ADMIN_UTILISATEURS', 'ADMIN_LECTURE'],
    },
  ];

  constructor() {
    // ── Update page title on navigation ──────────────
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url: string = e.urlAfterRedirects;
      const found = this.allItems.find((i) => url === i.route || url.startsWith(i.route + '/'));
      this.currentPage.set(found ? found.label : 'Dashboard');
    });
  }

  // ── Sections ──────────────────────────────────────
  get visibleItems() {
    const userRole = this.user()?.role;
    if (!userRole) return [];
    
    return this.allItems.filter(item => item.roles.includes(userRole));
  }

  get visibleSections() {
    const labels = ['Principal', 'Gestion', 'Contenu & Système'];
    return labels
      .map((label) => ({
        label,
        items: this.visibleItems.filter((i) => i.section === label),
      }))
      .filter((s) => s.items.length > 0);
  }

  get activeRoute() {
    return this.router.url;
  }

  // ── Actions ───────────────────────────────────────
  toggleSidenav() {
    this.sidenavOpen.update((v) => !v);
  }
  closeSidenav() {
    this.sidenavOpen.set(false);
  }

  toggleTheme() {
    this.auth.toggleTheme();
  }

  logout() {
    this.auth.logout();
  }
}
