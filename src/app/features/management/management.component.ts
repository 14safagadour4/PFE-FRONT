import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PartnerService } from '../../core/services/partner.service';

interface RoleOpt {
    id: number;
    icon: string;
    name: string;
    desc: string;
}

interface PermOpt {
    key: string;
    label: string;
    sub: string;
    on: boolean;
}

@Component({
    selector: 'app-management-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.css']
})
export class ManagementModalComponent implements OnInit {
    @Output() closed = new EventEmitter<void>();

    private svc = inject(PartnerService);
    private fb = inject(FormBuilder);

    loading = false;
    success = false;
    errorMsg = '';

    form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    });

    roles: RoleOpt[] = [
        { id: 1, icon: '👁', name: 'Admin Lecture', desc: 'Voir toutes les sections. Aucune modification.' },
        { id: 2, icon: '📚', name: 'Admin Contenu', desc: 'Ajouter et gérer le contenu éducatif.' },
        { id: 3, icon: '👥', name: 'Admin Utilisateurs', desc: 'Valider et gérer les comptes.' },
        { id: 4, icon: '⚙️', name: 'Admin Général', desc: 'Accès étendu sauf Super Admin.' },
    ];

    selectedRoleId = 1;

    perms: PermOpt[] = [
        { key: 'canViewDashboard', label: 'Voir Dashboard', sub: 'Statistiques globales', on: true },
        { key: 'canAddContent', label: 'Ajouter Contenu', sub: 'Articles, vidéos, exercices', on: true },
        { key: 'canManageUsers', label: 'Gérer Utilisateurs', sub: 'Valider, bloquer, modifier', on: false },
        { key: 'canManageSpecialists', label: 'Valider Spécialistes', sub: 'Approbation des profils', on: false },
        { key: 'canViewActivityLogs', label: 'Voir Logs', sub: 'Journal d\'activité', on: false },
        { key: 'canViewStatistics', label: 'Voir Statistiques', sub: 'Métriques avancées', on: true },
    ];

    ngOnInit(): void {
        // load roles from API if available
        this.svc.getRoles().subscribe({
            next: r => {
                if (r.success && r.data.length) {
                    this.roles = r.data.map((role, i) => ({
                        id: role.id,
                        icon: ['👁', '📚', '👥', '⚙️'][i % 4],
                        name: role.displayName,
                        desc: role.description
                    }));
                    this.selectedRoleId = this.roles[0].id;
                }
            },
            error: () => { } // keep mock roles
        });
    }

    pickRole(id: number) { this.selectedRoleId = id; }
    togglePerm(p: PermOpt) { p.on = !p.on; }

    submit() {
        if (this.form.invalid) { this.form.markAllAsTouched(); return; }
        this.loading = true;
        this.errorMsg = '';

        const permsObj: Record<string, boolean> = {};
        this.perms.forEach(p => permsObj[p.key] = p.on);

        const req = {
            ...this.form.value as any,
            roleId: this.selectedRoleId,
            ...permsObj
        };

        this.svc.create(req).subscribe({
            next: r => {
                this.loading = false;
                if (r.success) { this.success = true; setTimeout(() => this.close(), 1800); }
                else this.errorMsg = r.message;
            },
            error: e => {
                this.loading = false;
                this.errorMsg = e.error?.message ?? 'Erreur lors de la création.';
            }
        });
    }

    close() { this.closed.emit(); }
}