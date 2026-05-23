import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('cartas-frontend');
  protected readonly backendMessage = signal<string>('En attente du backend...');

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getHelloMessage().subscribe({
      next: (data: { message: string }) => {
        this.backendMessage.set(data.message);
      },
      error: (err: any) => {
        this.backendMessage.set('Erreur : Impossible de contacter le backend.');
        console.error(err);
      }
    });
  }
}
