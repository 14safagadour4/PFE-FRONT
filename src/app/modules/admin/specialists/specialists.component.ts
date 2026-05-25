import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpecialistService } from '../../../core/services/specialist.service';

export interface Specialist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'REFUSED';
  validatedAt?: string;
  joinedAt: string;
  bio?: string;
  certificateUrl?: string;
  refusalReason?: string;
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

  // New states for Refusal and Document Modal
  showRefusalModal = false;
  refusalReason = '';
  
  showDocModal = false;
  safeDocUrl: SafeResourceUrl | null = null;

  stats = { total: 0, pending: 0, active: 0, refused: 0 };

  constructor(
    private specialistService: SpecialistService,
    private sanitizer: DomSanitizer
  ) { }

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
    this.stats.active = this.specialists.filter(s => s.status === 'ACTIVE').length;
    this.stats.refused = this.specialists.filter(s => s.status === 'REFUSED').length;
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

  validate(s: Specialist) {
    if (!confirm(`Valider l'inscription de ${s.firstName} ?`)) return;
    this.specialistService.validate(s.id).subscribe(() => {
      s.status = 'ACTIVE';
      s.validatedAt = new Date().toISOString();
      this.computeStats();
    });
  }

  openRefusalPrompt(s: Specialist) {
    this.selectedSpecialist = s;
    this.refusalReason = '';
    this.showRefusalModal = true;
  }

  confirmRefusal() {
    if (!this.selectedSpecialist || !this.refusalReason.trim()) return;
    this.specialistService.refuse(this.selectedSpecialist.id, this.refusalReason).subscribe(() => {
      this.selectedSpecialist!.status = 'REFUSED';
      this.selectedSpecialist!.refusalReason = this.refusalReason;
      this.showRefusalModal = false;
      this.computeStats();
    });
  }

  viewDocument(s: Specialist) {
    if (!s.certificateUrl) return;
    const url = `http://localhost:8080/uploads/${s.certificateUrl}`;
    this.safeDocUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.showDocModal = true;
  }

  closeDocModal() {
    this.showDocModal = false;
    this.safeDocUrl = null;
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
      { id: 1, firstName: 'Amira', lastName: 'Ben Salah', email: 'amira@cartas.tn', specialty: 'Psychologue', status: 'PENDING', joinedAt: '2026-01-10' },
      { id: 2, firstName: 'Karim', lastName: 'Mansour', email: 'karim@cartas.tn', specialty: 'Thérapeute', status: 'ACTIVE', validatedAt: '2026-02-01', joinedAt: '2026-01-05' },
      { id: 3, firstName: 'Sonia', lastName: 'Trabelsi', email: 'sonia@cartas.tn', specialty: 'Coach', status: 'PENDING', joinedAt: '2026-02-20' },
      { id: 4, firstName: 'Nour', lastName: 'Gharbi', email: 'nour@cartas.tn', specialty: 'Nutritionniste', status: 'REFUSED', joinedAt: '2025-12-15' },
    ];
  }
}
