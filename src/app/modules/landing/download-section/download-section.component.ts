import { Component } from '@angular/core';

@Component({
  selector: 'app-download-section',
  templateUrl: './download-section.component.html',
  styleUrl: './download-section.component.css',
  standalone: false,
})
export class DownloadSectionComponent {
  openStore(platform: 'ios' | 'android') {
    const deepLink = 'cartas://home';
    const iosStore = 'https://apps.apple.com/app/cartas';
    const androidStore = 'https://play.google.com/store/apps/details?id=tn.cartas.app';
    const start = Date.now();

    window.location.href = deepLink;

    setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.location.href = platform === 'ios' ? iosStore : androidStore;
      }
    }, 1500);
  }
}
