import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService, LearningModule } from './content.service';

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

  stats = { total: 0, published: 0, draft: 0, totalViews: 0 };
  categories: any[] = [];
  
  showModal = false;
  isCreateMode = false;
  isEditMode = false;
  editingModuleId: number | null = null;
  
  newModule: any = {
    title: '',
    description: '',
    authorName: '',
    duration: '',
    totalLessons: 0,
    imageUrl: 'assets/images/nutri.jpg',
    categoryId: null,
    contentType: 'ARTICLE',
    lessons: []
  };

  typeIcons: Record<string, string> = {
    ARTICLE: '📄', VIDEO: '🎬', PODCAST: '🎙️', EXERCISE: '🧘'
  };

  constructor(private contentService: ContentService) {}

  ngOnInit() { 
    this.load(); 
    this.loadCategories();
  }

  addLesson() {
    this.newModule.lessons.push({
      title: '',
      duration: '',
      contentText: '',
      blocksJson: '[]',
      expanded: true // La nouvelle leçon est ouverte par défaut
    });
    this.newModule.totalLessons = this.newModule.lessons.length;
  }

  toggleLesson(lesson: any) {
    lesson.expanded = !lesson.expanded;
  }

  removeLesson(index: number) {
    this.newModule.lessons.splice(index, 1);
    this.newModule.totalLessons = this.newModule.lessons.length;
  }

  load() {
    this.loading = true;
    this.contentService.getModules().subscribe({
      next: (modules) => {
        this.items = modules.map(m => this.mapModuleToItem(m));
        this.applyFilters();
        this.computeStats();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement modules:', err);
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.contentService.getCategories().subscribe(cats => this.categories = cats);
  }

  private mapModuleToItem(m: LearningModule): ContentItem {
    return {
      id: m.id,
      title: m.title,
      type: (m.contentType as any) || 'EXERCISE',
      category: m.category?.name || 'Général',
      author: m.authorName || 'Partenaire',
      status: m.isPublished ? 'PUBLISHED' : 'DRAFT',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      thumbnail: m.imageUrl,
      description: m.description
    };
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

  openModal(item: ContentItem) { 
    this.selectedItem = item; 
    this.isCreateMode = false;
    this.showModal = true; 
  }

  openCreateModal() {
    this.isCreateMode = true;
    this.isEditMode = false;
    this.selectedItem = null;
    this.showModal = true;
    this.resetForm();
  }

  openEditModal(item: ContentItem) {
    this.isCreateMode = false;
    this.isEditMode = true;
    this.editingModuleId = item.id;
    this.selectedItem = item;
    
    // Charger les détails du module depuis le service pour avoir les leçons
    this.contentService.getModules().subscribe(modules => {
      const module = modules.find(m => m.id === item.id);
      if (module) {
        this.newModule = {
          id: module.id,
          title: module.title,
          description: module.description,
          authorName: module.authorName,
          duration: module.duration,
          totalLessons: module.totalLessons,
          imageUrl: module.imageUrl,
          categoryId: module.category?.id,
          contentType: module.contentType,
          lessons: module.lessons ? module.lessons.map(l => ({
            ...l,
            contentText: this.extractTextFromBlocks(l.blocksJson),
            expanded: false
          })) : []
        };
        this.showModal = true;
      }
    });
  }

  private extractTextFromBlocks(blocksJson: string): string {
    try {
      const blocks = JSON.parse(blocksJson);
      return blocks.filter((b: any) => b.type === 'text').map((b: any) => b.content).join('\n');
    } catch (e) {
      return '';
    }
  }

  closeModal() { this.showModal = false; this.selectedItem = null; }

  saveModule() {
    // Transformer le texte en JSON pour chaque leçon
    const processedLessons = this.newModule.lessons.map((l: any) => ({
      id: l.id,
      title: l.title,
      duration: l.duration,
      blocksJson: JSON.stringify([{ type: 'text', content: l.contentText || '' }])
    }));

    const payload = {
      ...this.newModule,
      lessons: processedLessons,
      category: { id: this.newModule.categoryId }
    };
    
    if (this.isEditMode && this.editingModuleId) {
      payload.id = this.editingModuleId;
    }

    this.contentService.createModule(payload).subscribe({
      next: (m) => {
        if (this.isEditMode) {
          const index = this.items.findIndex(i => i.id === m.id);
          if (index !== -1) {
            this.items[index] = this.mapModuleToItem(m);
          }
        } else {
          this.items.unshift(this.mapModuleToItem(m));
        }
        this.applyFilters();
        this.computeStats();
        this.closeModal();
        this.resetForm();
      },
      error: (err) => console.error('Erreur sauvegarde:', err)
    });
  }

  resetForm() {
    this.newModule = { 
      title: '', 
      description: '', 
      authorName: '', 
      duration: '', 
      totalLessons: 0, 
      imageUrl: 'assets/images/nutri.jpg', 
      categoryId: null, 
      contentType: 'ARTICLE',
      lessons: [] 
    };
  }

  toggleStatus(item: ContentItem) {
    const newStatus = item.status === 'PUBLISHED' ? false : true;
    this.contentService.togglePublish(item.id, newStatus).subscribe({
      next: () => {
        item.status = newStatus ? 'PUBLISHED' : 'DRAFT';
        this.computeStats();
      },
      error: (err) => console.error('Erreur toggle status:', err)
    });
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