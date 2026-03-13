import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ManagementModalComponent } from '../management/management.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ManagementModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
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

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const url = e.urlAfterRedirects;
      const found = this.allItems.find(i => i.route === url);
      if (found) this.currentPage.set(found.label);
    });
  }

  allItems = [
    { ico: '🏠', label: 'Dashboard', route: '/dashboard', section: 'Principal', badge: '', badgeType: '', saOnly: false },
    { ico: '⚡', label: 'Activités', route: '/dashboard/activities', section: 'Principal', badge: '12', badgeType: 'g', saOnly: false },
    { ico: '👥', label: 'Utilisateurs', route: '/dashboard/users', section: 'Gestion', badge: '3', badgeType: 'r', saOnly: false },
    { ico: '🩺', label: 'Spécialistes', route: '/dashboard/specialists', section: 'Gestion', badge: '', badgeType: '', saOnly: false },
    { ico: '🎭', label: 'Art-Thérapeutes', route: '/dashboard/therapists', section: 'Gestion', badge: '', badgeType: '', saOnly: false },
    { ico: '🤝', label: 'Partenaires', route: '/dashboard/partners', section: 'Gestion', badge: '', badgeType: '', saOnly: true },
    { ico: '📚', label: 'Contenu Éducatif', route: '/dashboard/content', section: 'Contenu & Système', badge: '', badgeType: '', saOnly: false },
    { ico: '🔐', label: 'Rôles', route: '/dashboard/roles', section: 'Contenu & Système', badge: '', badgeType: '', saOnly: true },
    { ico: '⚙️', label: 'Paramètres', route: '/dashboard/settings', section: 'Contenu & Système', badge: '', badgeType: '', saOnly: true },
  ];

  get visibleItems() {
    // Temporaire : affiche tout (retire le filtre saOnly)
    return this.allItems;
    // Quand tu veux remettre la protection :
    // return this.allItems.filter(i => !i.saOnly || this.auth.isSuperAdmin());
  }

  get visibleSections() {
    const labels = ['Principal', 'Gestion', 'Contenu & Système'];
    return labels.map(label => ({
      label,
      items: this.visibleItems.filter(i => i.section === label)
    })).filter(s => s.items.length > 0);
  }

  get activeRoute() { return this.router.url; }

  toggleSidenav() { this.sidenavOpen.update(v => !v); }
  closeSidenav() { this.sidenavOpen.set(false); }

  toggleTheme() {
    // Changer l'état (true/false)
    this.isDark = signal(true);

    // Sauvegarder dans localStorage
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');


    if (this.isDark()) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }

  logout() { this.auth.logout(); }
}