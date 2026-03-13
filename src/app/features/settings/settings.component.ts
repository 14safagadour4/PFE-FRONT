import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service'; // ← AJOUTE

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  activeTab = 'profile';

  // Profile - VIDE 
  profile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '+216 20 000 000', 
    preferredTheme: 'dark'
  };
  profileSaved = false;

  // Security
  passwords = { current: '', newPass: '', confirm: '' };
  passwordError = '';
  passwordSaved = false;

  // Platform
  platform = {
    appName: 'Cartas',
    supportEmail: 'support@cartas.tn',
    maxPartnersPerRole: 10,
    allowRegistration: false,
    maintenanceMode: false,
    emailNotifications: true,
    twoFactorRequired: false,
  };
  platformSaved = false;

  tabs = [
    { key: 'profile', label: 'Profil', icon: '👤' },
    { key: 'security', label: 'Sécurité', icon: '🔒' },
    { key: 'platform', label: 'Plateforme', icon: '⚙️' },
    { key: 'about', label: 'À propos', icon: 'ℹ️' },
  ];

  private authService = inject(AuthService); // ← INJECTION

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // 1. Essayer de récupérer depuis le token JWT
    const userFromToken = this.authService.getUserFromToken();

    if (userFromToken) {
      console.log('Utilisateur depuis token:', userFromToken);
      this.profile.firstName = userFromToken.firstName || '';
      this.profile.lastName = userFromToken.lastName || '';
      this.profile.email = userFromToken.email || '';
      this.profile.preferredTheme = userFromToken.preferredTheme || 'dark';
      return;
    }

    // 2. Fallback: récupérer depuis localStorage
    const userFromStorage = this.authService.getUser();
    if (userFromStorage) {
      console.log('Utilisateur depuis localStorage:', userFromStorage);
      this.profile.firstName = userFromStorage.firstName || '';
      this.profile.lastName = userFromStorage.lastName || '';
      this.profile.email = userFromStorage.email || '';
      this.profile.preferredTheme = userFromStorage.preferredTheme || 'dark';
      return;
    }

    // 3. Dernier recours: données mock (ne devrait pas arriver si connecté)
    console.warn('Aucune donnée utilisateur trouvée, utilisation des valeurs par défaut');
    this.profile.firstName = 'Super';
    this.profile.lastName = 'Admin';
    this.profile.email = 'admin@cartas.tn';
  }

  saveProfile() {
    // TODO: Appeler l'API pour mettre à jour le profil
    this.profileSaved = true;
    setTimeout(() => this.profileSaved = false, 3000);
  }

  savePassword() {
    this.passwordError = '';
    if (!this.passwords.current) { this.passwordError = 'Entrez le mot de passe actuel'; return; }
    if (this.passwords.newPass.length < 8) { this.passwordError = 'Minimum 8 caractères'; return; }
    if (this.passwords.newPass !== this.passwords.confirm) { this.passwordError = 'Les mots de passe ne correspondent pas'; return; }

    // TODO: Appeler l'API pour changer le mot de passe
    this.passwordSaved = true;
    this.passwords = { current: '', newPass: '', confirm: '' };
    setTimeout(() => this.passwordSaved = false, 3000);
  }

  savePlatform() {
    // TODO: Appeler l'API pour sauvegarder les paramètres plateforme
    this.platformSaved = true;
    setTimeout(() => this.platformSaved = false, 3000);
  }

  get initials() {
    return (this.profile.firstName?.charAt(0) || 'S') +
      (this.profile.lastName?.charAt(0) || 'A');
  }
}