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
  isDark = signal(true);

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
      saOnly: false,
    },
    {
      ico: '⚡',
      label: 'Activités',
      route: '/admin/activities',
      section: 'Principal',
      badge: '12',
      badgeType: 'g',
      saOnly: false,
    },
    {
      ico: '👥',
      label: 'Utilisateurs',
      route: '/admin/users',
      section: 'Gestion',
      badge: '3',
      badgeType: 'r',
      saOnly: false,
    },
    {
      ico: '🩺',
      label: 'Spécialistes',
      route: '/admin/specialists',
      section: 'Gestion',
      badge: '',
      badgeType: '',
      saOnly: false,
    },
    {
      ico: '🎭',
      label: 'Art-Thérapeutes',
      route: '/admin/therapists',
      section: 'Gestion',
      badge: '',
      badgeType: '',
      saOnly: false,
    },
    {
      ico: '🤝',
      label: 'Partenaires',
      route: '/admin/partners',
      section: 'Gestion',
      badge: '',
      badgeType: '',
      saOnly: true,
    },
    {
      ico: '📚',
      label: 'Contenu Éducatif',
      route: '/admin/content',
      section: 'Contenu & Système',
      badge: '',
      badgeType: '',
      saOnly: false,
    },
    {
      ico: '🔐',
      label: 'Rôles',
      route: '/admin/roles',
      section: 'Contenu & Système',
      badge: '',
      badgeType: '',
      saOnly: true,
    },
    {
      ico: '⚙️',
      label: 'Paramètres',
      route: '/admin/settings',
      section: 'Contenu & Système',
      badge: '',
      badgeType: '',
      saOnly: true,
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
    return this.allItems;
    // Remettre quand auth stable :
    // return this.allItems.filter(i => !i.saOnly || this.auth.isSuperAdmin());
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
    this.isDark.update((v) => !v);
    this.auth.toggleTheme();
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
    if (this.isDark()) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }

  logout() {
    this.auth.logout();
  }
}
