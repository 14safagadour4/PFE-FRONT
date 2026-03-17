import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Therapist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialization: string;
  yearsExperience: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  rating?: number;
  sessionsCount: number;
  joinedAt: string;
  bio?: string;
  languages?: string[];
}

@Component({
  selector: 'app-therapists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './therapists.component.html',
  styleUrls: ['./therapists.component.css']
})
export class TherapistsComponent implements OnInit {
  therapists: Therapist[] = [];
  filtered: Therapist[] = [];
  loading = true;
  searchTerm = '';
  statusFilter = 'ALL';
  selectedTherapist: Therapist | null = null;
  showModal = false;

  stats = { total: 0, active: 0, inactive: 0, avgRating: 0 };

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    setTimeout(() => {
      this.therapists = this.mockData();
      this.applyFilters();
      this.computeStats();
      this.loading = false;
    }, 600);
  }

  computeStats() {
    this.stats.total = this.therapists.length;
    this.stats.active = this.therapists.filter(t => t.status === 'ACTIVE').length;
    this.stats.inactive = this.therapists.filter(t => t.status === 'INACTIVE').length;
    const rated = this.therapists.filter(t => t.rating);
    this.stats.avgRating = rated.length
      ? Math.round(rated.reduce((s, t) => s + (t.rating || 0), 0) / rated.length * 10) / 10
      : 0;
  }

  applyFilters() {
    this.filtered = this.therapists.filter(t => {
      const matchSearch = !this.searchTerm ||
        `${t.firstName} ${t.lastName} ${t.email} ${t.specialization}`
          .toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.statusFilter === 'ALL' || t.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  toggleStatus(t: Therapist) {
    t.status = t.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.computeStats();
  }

  openModal(t: Therapist) { this.selectedTherapist = t; this.showModal = true; }
  closeModal() { this.showModal = false; this.selectedTherapist = null; }

  initials(t: Therapist) { return `${t.firstName[0]}${t.lastName[0]}`.toUpperCase(); }
  stars(n: number) { return Array(Math.round(n)).fill('★'); }

  mockData(): Therapist[] {
    return [
      { id: 1, firstName: 'Leila', lastName: 'Hamdi', email: 'leila@cartas.tn', phone: '+216 20 111 222', specialization: 'TCC', yearsExperience: 8, status: 'ACTIVE', rating: 4.8, sessionsCount: 312, joinedAt: '2024-03-01', bio: 'Spécialisée en thérapie cognitivo-comportementale.', languages: ['Français', 'Arabe'] },
      { id: 2, firstName: 'Youssef', lastName: 'Baccouche', email: 'youssef@cartas.tn', phone: '+216 55 333 444', specialization: 'EMDR', yearsExperience: 5, status: 'ACTIVE', rating: 4.6, sessionsCount: 185, joinedAt: '2024-06-15', languages: ['Français', 'Anglais'] },
      { id: 3, firstName: 'Rim', lastName: 'Chaker', email: 'rim@cartas.tn', specialization: 'Pleine conscience', yearsExperience: 3, status: 'PENDING', rating: 0, sessionsCount: 0, joinedAt: '2026-01-20' },
      { id: 4, firstName: 'Mehdi', lastName: 'Selmi', email: 'mehdi@cartas.tn', specialization: 'Psychanalyse', yearsExperience: 12, status: 'INACTIVE', rating: 4.2, sessionsCount: 540, joinedAt: '2023-09-01' },
    ];
  }
}