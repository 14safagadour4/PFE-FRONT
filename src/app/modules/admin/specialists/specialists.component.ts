import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpecialistService } from '../../../core/services/specialist.service';

export interface Specialist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  status: 'PENDING' | 'VALIDATED' | 'REJECTED';
  validatedAt?: string;
  createdAt: string;
  avatar?: string;
}

@Component({
  selector: 'app-specialists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.css']
})
export class SpecialistsComponent implements OnInit {
  specialists: Specialist[] = [];
  filtered: Specialist[] = [];
  loading = true;
  searchTerm = '';
  statusFilter = 'ALL';
  selectedSpecialist: Specialist | null = null;
  showModal = false;

  stats = { total: 0, pending: 0, validated: 0, rejected: 0 };

  constructor(private specialistService: SpecialistService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.specialistService.getAll().subscribe({
      next: (data: Specialist[]) => {
        console.log('Données reçues (traitées):', data);
        this.specialists = data;
        this.applyFilters();
        this.computeStats();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur complète:', err);
        this.specialists = [];
        this.applyFilters();
        this.computeStats();
        this.loading = false;
      }
    });
  }

  computeStats() {
    this.stats.total = this.specialists.length;
    this.stats.pending = this.specialists.filter(s => s.status === 'PENDING').length;
    this.stats.validated = this.specialists.filter(s => s.status === 'VALIDATED').length;
    this.stats.rejected = this.specialists.filter(s => s.status === 'REJECTED').length;
  }

  applyFilters() {
    this.filtered = this.specialists.filter(s => {
      const matchSearch = !this.searchTerm ||
        `${s.firstName} ${s.lastName} ${s.email} ${s.specialty}`
          .toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.statusFilter === 'ALL' || s.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  validate(id: number) {
    this.specialistService.validate(id).subscribe({
      next: () => this.load(),
      error: () => {
        const s = this.specialists.find(x => x.id === id);
        if (s) { s.status = 'VALIDATED'; s.validatedAt = new Date().toISOString(); }
        this.applyFilters(); this.computeStats();
      }
    });
  }

  reject(id: number) {
    const s = this.specialists.find(x => x.id === id);
    if (s) { s.status = 'REJECTED'; }
    this.applyFilters(); this.computeStats();
  }

  openModal(s: Specialist) {
    this.selectedSpecialist = s;
    this.showModal = true;
  }

  closeModal() { this.showModal = false; this.selectedSpecialist = null; }

  initials(s: Specialist) {
    return `${s.firstName[0]}${s.lastName[0]}`.toUpperCase();
  }

  mockData(): Specialist[] {
    return [
      { id: 1, firstName: 'Amira', lastName: 'Ben Salah', email: 'amira@cartas.tn', specialty: 'Psychologue', status: 'PENDING', createdAt: '2026-01-10' },
      { id: 2, firstName: 'Karim', lastName: 'Mansour', email: 'karim@cartas.tn', specialty: 'Thérapeute', status: 'VALIDATED', validatedAt: '2026-02-01', createdAt: '2026-01-05' },
      { id: 3, firstName: 'Sonia', lastName: 'Trabelsi', email: 'sonia@cartas.tn', specialty: 'Coach', status: 'PENDING', createdAt: '2026-02-20' },
      { id: 4, firstName: 'Nour', lastName: 'Gharbi', email: 'nour@cartas.tn', specialty: 'Nutritionniste', status: 'REJECTED', createdAt: '2025-12-15' },
    ];
  }
}
