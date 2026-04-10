import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TherapistService } from '../../../core/services/therapist.service';

export interface Therapist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialization: string;
  yearsExperience: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'REFUSED';
  rating?: number;
  sessionsCount: number;
  joinedAt: string;
  bio?: string;
  languages?: string[];
  certificateUrl?: string;
  refusalReason?: string;
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

  // New states for Refusal and Document Modal
  showRefusalModal = false;
  refusalReason = '';
  
  showDocModal = false;
  safeDocUrl: SafeResourceUrl | null = null;

  stats = { total: 0, active: 0, inactive: 0, avgRating: 0 };

  constructor(
    private therapistService: TherapistService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.therapistService.getAll().subscribe({
      next: (data) => {
        this.therapists = data;
        this.applyFilters();
        this.computeStats();
        this.loading = false;
      },
      error: () => {
        this.therapists = [];
        this.loading = false;
      }
    });
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

  // Actions
  acceptTherapist(t: Therapist) {
    if (!confirm(`Valider l'inscription de ${t.firstName} ?`)) return;
    this.therapistService.validate(t.id).subscribe(() => {
      t.status = 'ACTIVE';
      this.computeStats();
    });
  }

  openRefusalPrompt(t: Therapist) {
    this.selectedTherapist = t;
    this.refusalReason = '';
    this.showRefusalModal = true;
  }

  confirmRefusal() {
    if (!this.selectedTherapist || !this.refusalReason.trim()) return;
    this.therapistService.refuse(this.selectedTherapist.id, this.refusalReason).subscribe(() => {
      this.selectedTherapist!.status = 'REFUSED';
      this.selectedTherapist!.refusalReason = this.refusalReason;
      this.showRefusalModal = false;
      this.computeStats();
    });
  }

  viewDocument(t: Therapist) {
    if (!t.certificateUrl) return;
    // Assuming backend serves uploads at this URL
    const url = `http://localhost:8080/uploads/${t.certificateUrl}`;
    this.safeDocUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.showDocModal = true;
  }

  closeDocModal() {
    this.showDocModal = false;
    this.safeDocUrl = null;
  }

  initials(t: Therapist) { return `${t.firstName[0]}${t.lastName[0]}`.toUpperCase(); }
  stars(n: number) { return Array(Math.round(n || 0)).fill('★'); }

  mockData(): Therapist[] {
    return [
      { id: 1, firstName: 'Leila', lastName: 'Hamdi', email: 'leila@cartas.tn', phone: '+216 20 111 222', specialization: 'TCC', yearsExperience: 8, status: 'ACTIVE', rating: 4.8, sessionsCount: 312, joinedAt: '2024-03-01', bio: 'Spécialisée en thérapie cognitivo-comportementale.', languages: ['Français', 'Arabe'] },
      { id: 2, firstName: 'Youssef', lastName: 'Baccouche', email: 'youssef@cartas.tn', phone: '+216 55 333 444', specialization: 'EMDR', yearsExperience: 5, status: 'ACTIVE', rating: 4.6, sessionsCount: 185, joinedAt: '2024-06-15', languages: ['Français', 'Anglais'] },
      { id: 3, firstName: 'Rim', lastName: 'Chaker', email: 'rim@cartas.tn', specialization: 'Pleine conscience', yearsExperience: 3, status: 'PENDING', rating: 0, sessionsCount: 0, joinedAt: '2026-01-20' },
      { id: 4, firstName: 'Mehdi', lastName: 'Selmi', email: 'mehdi@cartas.tn', specialization: 'Psychanalyse', yearsExperience: 12, status: 'INACTIVE', rating: 4.2, sessionsCount: 540, joinedAt: '2023-09-01' },
    ];
  }
}