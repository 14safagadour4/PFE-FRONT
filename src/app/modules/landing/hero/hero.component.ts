import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: false,
})
export class HeroComponent {
  openApp(platform?: 'ios' | 'android') {
    const deepLink = 'cartas://home';
    const iosStore = 'https://apps.apple.com/app/cartas';
    const androidStore = 'https://play.google.com/store/apps/details?id=tn.cartas.app';
    const start = Date.now();

    window.location.href = deepLink;

    setTimeout(() => {
      if (Date.now() - start < 2000) {
        const isIos = platform === 'ios' || /iPad|iPhone|iPod/.test(navigator.userAgent);
        window.location.href = isIos ? iosStore : androidStore;
      }
    }, 1500);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
