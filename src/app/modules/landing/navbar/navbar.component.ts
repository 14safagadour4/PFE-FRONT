import { Component, HostListener, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false,
})
export class NavbarComponent {
  scrolled = signal(false);
  adminVisible = signal(false);

  private clickCount = 0;
  private clickTimer: any = null;

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  handleLogoClick(e: Event) {
    e.preventDefault();
    this.clickCount++;
    clearTimeout(this.clickTimer);

    this.clickTimer = setTimeout(() => {
      this.clickCount = 0;
    }, 600);

    if (this.clickCount >= 3) {
      this.clickCount = 0;
      this.adminVisible.set(!this.adminVisible());

      if (this.adminVisible()) {
        setTimeout(() => this.adminVisible.set(false), 30000);
      }
    }
  }

  goAdmin() {
    this.router.navigate(['/admin/authSuper/register']);
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      // Offset pour la navbar fixe (74px de hauteur)
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Element with id "${id}" not found`);
    }
  }
}
