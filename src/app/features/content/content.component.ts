import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ContentItem {
  id: number;
  title: string;
  type: 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'EXERCISE';
  category: string;
  author: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  views: number;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  description?: string;
}

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  items: ContentItem[] = [];
  filtered: ContentItem[] = [];
  loading = true;
  searchTerm = '';
  typeFilter = 'ALL';
  statusFilter = 'ALL';
  selectedItem: ContentItem | null = null;
  showModal = false;

  stats = { total: 0, published: 0, draft: 0, totalViews: 0 };

  typeIcons: Record<string, string> = {
    ARTICLE: '📄', VIDEO: '🎬', PODCAST: '🎙️', EXERCISE: '🧘'
  };

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    setTimeout(() => {
      this.items = this.mockData();
      this.applyFilters();
      this.computeStats();
      this.loading = false;
    }, 600);
  }

  computeStats() {
    this.stats.total = this.items.length;
    this.stats.published = this.items.filter(i => i.status === 'PUBLISHED').length;
    this.stats.draft = this.items.filter(i => i.status === 'DRAFT').length;
    this.stats.totalViews = this.items.reduce((s, i) => s + i.views, 0);
  }

  applyFilters() {
    this.filtered = this.items.filter(i => {
      const matchSearch = !this.searchTerm ||
        `${i.title} ${i.author} ${i.category}`.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = this.typeFilter === 'ALL' || i.type === this.typeFilter;
      const matchStatus = this.statusFilter === 'ALL' || i.status === this.statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }

  openModal(item: ContentItem) { this.selectedItem = item; this.showModal = true; }
  closeModal() { this.showModal = false; this.selectedItem = null; }

  toggleStatus(item: ContentItem) {
    item.status = item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    this.computeStats();
  }

  archive(item: ContentItem) { item.status = 'ARCHIVED'; this.applyFilters(); this.computeStats(); }

  mockData(): ContentItem[] {
    return [
      { id: 1, title: 'Gérer l\'anxiété au quotidien', type: 'ARTICLE', category: 'Santé mentale', author: 'Dr. Amira Ben Salah', status: 'PUBLISHED', views: 1240, createdAt: '2026-01-05', updatedAt: '2026-02-10', description: 'Techniques pratiques pour réduire l\'anxiété.' },
      { id: 2, title: 'Méditation guidée 10 min', type: 'VIDEO', category: 'Pleine conscience', author: 'Leila Hamdi', status: 'PUBLISHED', views: 3560, createdAt: '2026-01-12', updatedAt: '2026-01-12', description: 'Séance de méditation pour débutants.' },
      { id: 3, title: 'Parler de soi sans culpabilité', type: 'PODCAST', category: 'Développement', author: 'Karim Mansour', status: 'DRAFT', views: 0, createdAt: '2026-02-20', updatedAt: '2026-03-01' },
      { id: 4, title: 'Exercice de respiration 4-7-8', type: 'EXERCISE', category: 'Relaxation', author: 'Rim Chaker', status: 'PUBLISHED', views: 890, createdAt: '2025-12-01', updatedAt: '2025-12-15' },
      { id: 5, title: 'Comprendre le stress chronique', type: 'ARTICLE', category: 'Santé mentale', author: 'Dr. Nour Gharbi', status: 'ARCHIVED', views: 450, createdAt: '2025-10-10', updatedAt: '2025-11-01' },
      { id: 6, title: 'Journalisme thérapeutique', type: 'EXERCISE', category: 'TCC', author: 'Youssef Baccouche', status: 'PUBLISHED', views: 670, createdAt: '2026-02-01', updatedAt: '2026-02-01' },
    ];
  }
}