// intro.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-intro-section',
  standalone: false,
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('introSection') introSection!: ElementRef;

  imageUrl: string = 'https://pleased-pink-ptj3ygjcd5.edgeone.app/cartas-forum-community-bg.png';
  isVisible = false;
  activeTab = 'problem';

  private intersectionObserver?: IntersectionObserver;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private setupIntersectionObserver() {
    if (!this.introSection?.nativeElement) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15, // Trigger when 15% of the section is visible
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.cdr.detectChanges();
          // Optional: unobserve after animation to save resources
          // this.intersectionObserver?.unobserve(entry.target);
        }
      });
    }, options);

    this.intersectionObserver.observe(this.introSection.nativeElement);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  scrollToModules() {
    const modulesSection = document.getElementById('modules-section');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
