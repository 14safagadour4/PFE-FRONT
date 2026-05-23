import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
  // ← SUPPRIME "standalone: true" s'il existe
})
export class AppComponent {
  title = 'CARTAS';
}
