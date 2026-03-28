import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

@Component({
  selector: 'app-bird-chatbot',
  templateUrl: './bird-chatbot.component.html',
  styleUrls: ['./bird-chatbot.component.css'],
  standalone: false,
})
export class BirdChatbotComponent implements OnInit {
  chatOpen = false;
  inputText = '';
  messages: Message[] = [];
  isTyping = false;
  tooltipVisible = false;
  @ViewChild('msgContainer') private msgContainer!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  // ========== SIMPLE KEYWORD PATTERNS ==========
  private patterns = {
    about: /c'est quoi|qui est|à propos|cartas|what is|who is|about|شنو هي|ما هي|تعريف|منصة|شنوة /i,
    app: /télécharger|app|application|download|installer|play store|app store|تحميل|تنزيل|تطبيق/i,
    services:
      /service|services|fonctionnalité|features|offre|propose|دمات|ميزات|شنو تقدم|شنو عندكم/i,
    contact:
      /contact|email|équipe|support|aide|joindre|reach out|get in touch|اتصال|تواصل|بريد|الدعم/i,
    plants: /plante|plantes|herbier|remède|remèdes|remedy|herbal|nébate|نبتات|أعشاب|وصفة|علاج/i,
    price: /prix|coût|tarif|gratuit|free|combien|cost|السعر|الثمن|مجاني|بش نحصلو/i,
    greetings: /^(bonjour|salut|bonsoir|hello|hi|hey|salam|مرحبا|يا مرحبا)$/i,
  };

  // ========== RESPONSES ==========
  private responses: Record<string, string[]> = {
    about: [
      '🌿 **CARTAS** est la première plateforme tunisienne de phytothérapie digitale.\n\n' +
        '✅ 340+ plantes médicinales\n' +
        '✅ 124 spécialistes\n' +
        '✅ 12 800+ utilisatrices\n\n' +
        '✨ 100% Made in Tunisia 🇹🇳',

      "🌱 **CARTAS** c'est :\n\n" +
        '🇹🇳 Une création 100% tunisienne\n' +
        '📚 Plus de 340 plantes médicinales\n' +
        '👨‍⚕️ 124 experts en phytothérapie\n' +
        '📱 Application gratuite et sans pub',
    ],

    app: [
      "📱 **Pour télécharger l'application :**\n\n" +
        '• iOS et Android\n' +
        '• 100% gratuit\n' +
        '• Sans publicité\n\n' +
        '👉 Téléchargez sur cartas.tn',

      '📲 **Lien de téléchargement :**\n' + 'Site : cartas.tn/app\n\n' + 'App Store et Google Play',

      '⬇️ **Téléchargez CARTAS maintenant !**\n\n' +
        '📥 App Store (iOS)\n' +
        '🤖 Google Play (Android)\n\n' +
        '✨ Installation rapide (< 2 min)\n' +
        '💚 Gratuit et sans pub',
    ],

    services: [
      '🌿 **Les services disponibles :**\n\n' +
        '📖 Herbier digital (340+ plantes)\n' +
        '🔍 Scanner AR de plantes\n' +
        '🧪 Remèdes naturels\n' +
        '🎨 Art-thérapie guidée\n' +
        '🎮 Parcours botanique\n' +
        '🤖 IA bien-être\n\n' +
        '✨ Tout est gratuit !',

      '✨ **6 services principaux :**\n\n' +
        '1️⃣ Herbier digital - 340+ plantes\n' +
        '2️⃣ Scanner AR - Identifiez les plantes\n' +
        '3️⃣ Remèdes naturels - IA personnalisée\n' +
        '4️⃣ Art-thérapie - Relaxation\n' +
        '5️⃣ Parcours gamifié - Apprendre\n' +
        '6️⃣ Chat spécialistes - Conseils\n\n' +
        '💚 Le tout GRATUIT !',
    ],

    contact: [
      '📩 **Contact :**\n\n' +
        'Email : contact@cartas.tn\n' +
        'Instagram : @cartas.app\n' +
        'LinkedIn : CARTAS Tunisia\n\n' +
        '⏱️ Réponse sous 24h',

      '📧 **Pour nous contacter :**\n' +
        'contact@cartas.tn\n\n' +
        'Réseaux sociaux :\n' +
        '📲 @cartas.app (Instagram)\n' +
        '💼 CARTAS Tunisia (LinkedIn)',
    ],

    plants: [
      '🌿 **Base de plantes :**\n\n' +
        '• 340+ plantes médicinales\n' +
        '• Photos HD de chaque plante\n' +
        '• Descriptions détaillées\n' +
        '• Bienfaits et utilisations\n\n' +
        "👉 Explorez la base dans l'app !",

      '📖 **Herbier digital :**\n\n' +
        '340+ plantes tunisiennes documentées\n\n' +
        '🔎 Recherche par :\n' +
        '• Symptôme\n' +
        '• Bénéfice santé\n' +
        '• Région de Tunisie',

      '🌱 **Our herbal database :**\n\n' +
        '✨ 340+ medicinal plants\n' +
        '✨ HD photos for each\n' +
        '✨ Traditional uses\n' +
        '✨ Health benefits',
    ],

    price: [
      '💰 **CARTAS est 100% gratuit !**\n\n' +
        '• Sans abonnement\n' +
        '• Sans publicité\n' +
        '• Sans frais cachés',

      '💎 **Entièrement gratuit :**\n\n' +
        'Toutes les fonctionnalités sans paiement\n\n' +
        '✅ 340+ plantes\n' +
        '✅ Scanner AR\n' +
        '✅ Chat experts\n\n' +
        'Zéro frais, zéro pub !',
    ],

    greetings: [
      'Salam ! 😊 Comment puis-je vous aider ?',
      'Bonjour ! 🌿 Que souhaitez-vous savoir ?',
      'Hello ! 👋 How can I help you today ?',
      'يا مرحبا ! ✨ شنو تحب تعرف ؟',
    ],

    default: [
      '🌿 **Comment puis-je vous aider ?**\n\n' +
        'Vous pouvez me demander :\n' +
        "• C'est quoi CARTAS ?\n" +
        '• Quels services ?\n' +
        '• Comment télécharger ?\n' +
        '• Comment contacter ?\n' +
        '• Plantes médicinales ?\n' +
        "• C'est gratuit ?",

      '😊 **Posez-moi votre question !**\n\n' +
        'Par exemple :\n' +
        '"C\'est quoi CARTAS ?"\n' +
        '"Quels services ?"\n' +
        '"Comment télécharger l\'app ?"',
    ],
  };

  ngOnInit() {
    setTimeout(() => {
      this.tooltipVisible = true;
      setTimeout(() => (this.tooltipVisible = false), 5000);
    }, 2000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen) {
      this.tooltipVisible = false;
      if (this.messages.length === 0) {
        setTimeout(() => this.addBotMsg(this.getRandomResponse('greetings')), 300);
      }
    }
  }

  sendMsg() {
    const text = this.inputText.trim();
    if (!text) return;

    this.messages.push({ role: 'user', text });
    this.inputText = '';
    this.isTyping = true;

    setTimeout(() => {
      this.isTyping = false;
      const category = this.classify(text);
      this.addBotMsg(this.getRandomResponse(category));
    }, 800);
  }

  sendQuick(text: string, category?: string) {
    this.messages.push({ role: 'user', text });
    this.isTyping = true;

    setTimeout(() => {
      this.isTyping = false;
      if (category) {
        this.addBotMsg(this.getRandomResponse(category));
      } else {
        const detectedCategory = this.classify(text);
        this.addBotMsg(this.getRandomResponse(detectedCategory));
      }
    }, 800);
  }

  formatText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text.replace(/\n/g, '<br>'));
  }

  private addBotMsg(text: string) {
    this.messages.push({ role: 'bot', text });
  }

  private scrollToBottom() {
    try {
      if (this.msgContainer) {
        this.msgContainer.nativeElement.scrollTop = this.msgContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  private classify(text: string): string {
    const lowerText = text.toLowerCase();

    if (this.patterns.greetings.test(text)) {
      return 'greetings';
    }

    if (this.patterns.about.test(lowerText)) return 'about';
    if (this.patterns.plants.test(lowerText)) return 'plants';
    if (this.patterns.app.test(lowerText)) return 'app';
    if (this.patterns.services.test(lowerText)) return 'services';
    if (this.patterns.contact.test(lowerText)) return 'contact';
    if (this.patterns.price.test(lowerText)) return 'price';

    return 'default';
  }

  private getRandomResponse(category: string): string {
    const responses =
      this.responses[category as keyof typeof this.responses] || this.responses['default'];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
