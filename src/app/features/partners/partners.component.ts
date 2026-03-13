import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PartnerService } from '../../core/services/partner.service';
import { Partner, Role, Page, CreatePartnerRequest } from '../../core/models';
import { ManagementModalComponent } from '../management/management.component';
@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ManagementModalComponent],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  private svc = inject(PartnerService);
  private fb = inject(FormBuilder);

  page = signal<Page<Partner> | null>(null);
  partners = signal<Partner[]>([]);
  roles = signal<Role[]>([]);
  modalOpen = signal(false);
  formLoading = signal(false);
  formError = signal('');
  selectedRole = signal<Role | null>(null);
  permStates = signal<Record<string, boolean>>({});

  permKeys = [
    { key: 'canViewDashboard', label: 'Voir Dashboard', desc: 'Statistiques globales' },
    { key: 'canAddContent', label: 'Ajouter Contenu', desc: 'Articles, vidéos...' },
    { key: 'canManageUsers', label: 'Gérer Utilisateurs', desc: 'Valider, bloquer' },
    { key: 'canManageSpecialists', label: 'Valider Spécialistes', desc: 'Approbation profils' },
    { key: 'canViewActivityLogs', label: 'Voir Logs', desc: "Journal d'activité" },
    { key: 'canViewStatistics', label: 'Voir Statistiques', desc: 'Métriques avancées' },
  ];

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.load();
    this.svc.getRoles().subscribe(r => { if (r.success) this.roles.set(r.data); });
  }

  load(p = 0): void {
    this.svc.getAll(p).subscribe(r => {
      if (r.success) { this.page.set(r.data); this.partners.set(r.data.content); }
    });
  }

  pickRole(r: Role): void { this.selectedRole.set(r); }

  togglePerm(key: string): void {
    this.permStates.update(s => ({ ...s, [key]: !s[key] }));
  }

  submit(): void {
    // Vérifications
    if (this.form.invalid) {
      this.formError.set('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!this.selectedRole()) {
      this.formError.set('Veuillez sélectionner un rôle');
      return;
    }

    this.formLoading.set(true);
    this.formError.set('');

    const req: CreatePartnerRequest = {
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      email: this.form.value.email!,
      roleId: this.selectedRole()!.id,
      ...this.permStates()
    };

    console.log('Envoi requête:', req); // Pour debug

    this.svc.create(req).subscribe({
      next: (r) => {
        console.log('Réponse:', r); // Pour debug
        this.formLoading.set(false);

        if (r.success) {
          this.modalOpen.set(false);
          this.form.reset();
          this.selectedRole.set(null);
          this.permStates.set({});
          this.load(); // Recharger la liste
        } else {
          this.formError.set(r.message || 'Erreur lors de la création');
        }
      },
      error: (e) => {
        console.error('Erreur:', e); // Pour debug
        this.formLoading.set(false);
        this.formError.set(e.error?.message || e.message || 'Erreur de connexion');
      }
    });
  }

  toggle(id: number): void { this.svc.toggle(id).subscribe(() => this.load()); }
  remove(id: number): void {
    if (confirm('Supprimer ce partenaire ?'))
      this.svc.delete(id).subscribe(() => this.load());
  }

  initials(p: Partner): string {
    return (p.firstName[0] + p.lastName[0]).toUpperCase();
  }
  // Ajoute ces signaux avec les autres
  managementModalOpen = signal(false);

  // Ajoute ces méthodes
  openManagementModal(): void {
    this.managementModalOpen.set(true);
  }

  closeManagementModal(): void {
    this.managementModalOpen.set(false);
    this.load(); // Recharge la liste après fermeture
  }
}