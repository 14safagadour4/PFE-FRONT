import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Permission {
  key: string;
  label: string;
  description: string;
}

export interface Role {
  id: number;
  name: string;
  displayName: string;
  description: string;
  color: string;
  permissions: string[];
  partnersCount: number;
  isSystem: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  loading = true;
  selectedRole: Role | null = null;
  showModal = false;
  showCreateModal = false;
  editMode = false;

  newRole: Partial<Role> = { name: '', displayName: '', description: '', color: '#7b5ea7', permissions: [] };

  allPermissions: Permission[] = [
    { key: 'VIEW_DASHBOARD', label: 'Voir le dashboard', description: 'Accès aux statistiques' },
    { key: 'MANAGE_USERS', label: 'Gérer les utilisateurs', description: 'Bloquer, débloquer, valider' },
    { key: 'MANAGE_SPECIALISTS', label: 'Gérer les spécialistes', description: 'Valider et rejeter' },
    { key: 'MANAGE_CONTENT', label: 'Gérer le contenu', description: 'Publier, archiver' },
    { key: 'VIEW_LOGS', label: 'Voir les logs', description: 'Journal d\'activités' },
    { key: 'MANAGE_PARTNERS', label: 'Gérer les partenaires', description: 'Créer, modifier, supprimer' },
    { key: 'MANAGE_ROLES', label: 'Gérer les rôles', description: 'Créer et modifier les rôles' },
    { key: 'FULL_ACCESS', label: 'Accès complet', description: 'Toutes les permissions' },
  ];

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    setTimeout(() => {
      this.roles = this.mockData();
      this.loading = false;
    }, 500);
  }

  openRole(role: Role) { this.selectedRole = role; this.showModal = true; }
  closeModal() { this.showModal = false; this.selectedRole = null; }

  openCreate() {
    this.newRole = { name: '', displayName: '', description: '', color: '#7b5ea7', permissions: [] };
    this.showCreateModal = true;
  }
  closeCreate() { this.showCreateModal = false; }

  togglePerm(perm: string) {
    const list = this.newRole.permissions!;
    const idx = list.indexOf(perm);
    if (idx >= 0) list.splice(idx, 1); else list.push(perm);
  }

  hasPerm(perm: string) { return (this.newRole.permissions || []).includes(perm); }
  roleHasPerm(role: Role, perm: string) { return role.permissions.includes(perm); }

  saveRole() {
    if (!this.newRole.name || !this.newRole.displayName) return;
    this.roles.push({
      id: Date.now(),
      name: this.newRole.name!,
      displayName: this.newRole.displayName!,
      description: this.newRole.description || '',
      color: this.newRole.color || '#7b5ea7',
      permissions: this.newRole.permissions || [],
      partnersCount: 0,
      isSystem: false,
      createdAt: new Date().toISOString()
    });
    this.closeCreate();
  }

  deleteRole(role: Role) {
    if (role.isSystem) return;
    this.roles = this.roles.filter(r => r.id !== role.id);
    this.closeModal();
  }

  mockData(): Role[] {
    return [
      {
        id: 1, name: 'SUPER_ADMIN', displayName: 'Super Administrateur',
        description: 'Accès total à toute la plateforme',
        color: '#7b5ea7', permissions: ['FULL_ACCESS'], partnersCount: 1,
        isSystem: true, createdAt: '2024-01-01'
      },
      {
        id: 2, name: 'MODERATOR', displayName: 'Modérateur',
        description: 'Modération des utilisateurs et du contenu',
        color: '#3b82f6', permissions: ['VIEW_DASHBOARD', 'MANAGE_USERS', 'MANAGE_SPECIALISTS', 'VIEW_LOGS'],
        partnersCount: 3, isSystem: false, createdAt: '2024-06-15'
      },
      {
        id: 3, name: 'CONTENT_MANAGER', displayName: 'Gestionnaire de contenu',
        description: 'Gestion du contenu éditorial',
        color: '#10b981', permissions: ['VIEW_DASHBOARD', 'MANAGE_CONTENT'],
        partnersCount: 2, isSystem: false, createdAt: '2025-01-10'
      },
      {
        id: 4, name: 'ANALYST', displayName: 'Analyste',
        description: 'Accès en lecture aux statistiques',
        color: '#c9a84c', permissions: ['VIEW_DASHBOARD', 'VIEW_LOGS'],
        partnersCount: 1, isSystem: false, createdAt: '2025-03-20'
      },
    ];
  }
}