import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-magic-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="magic-login-container">
      <div class="loader-box">
        <div class="spinner"></div>
        <h2>Connexion en cours...</h2>
        <p>Veuillez patienter pendant que nous préparons votre espace.</p>
        
        @if (errorMsg()) {
          <div class="error-pill">
            {{ errorMsg() }}
            <button (click)="goToLogin()">Retour au login</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .magic-login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a1625;
      color: white;
      font-family: 'Inter', sans-serif;
    }
    .loader-box {
      text-align: center;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255,255,255,0.1);
      border-top: 5px solid #6a5af9;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    h2 { margin: 0 0 10px; font-weight: 600; }
    p { color: #8b8b8b; font-size: 14px; }
    .error-pill {
      margin-top: 20px;
      padding: 15px;
      background: rgba(244, 67, 54, 0.1);
      border: 1px solid #f44336;
      border-radius: 8px;
      color: #f44336;
    }
    button {
      display: block;
      margin: 10px auto 0;
      background: #f44336;
      color: white;
      border: none;
      padding: 5px 15px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class MagicLoginComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);

  errorMsg = signal('');

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    
    if (token) {
      this.auth.magicLogin(token).subscribe({
        next: (r) => {
          if (r.success) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.errorMsg.set(r.message || 'Lien invalide.');
          }
        },
        error: (err) => {
          this.errorMsg.set(err.error?.message || 'Erreur lors de la connexion.');
        }
      });
    } else {
      this.errorMsg.set('Aucun jeton de connexion trouvé.');
    }
  }

  goToLogin() {
    this.router.navigate(['/admin/authSuper/login']);
  }
}
