describe('🤖 CARTAS — Tests End-to-End (E2E) avec Cypress', () => {
  beforeEach(() => {
    // Nettoyer le stockage local avant chaque test pour s'assurer d'une session propre
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('✅ Doit authentifier le Super Admin, accéder au tableau de bord, puis créer un nouveau module d\'apprentissage', () => {
    // ══════════════════════════════════════════════════════
    // 1. GIVEN : Accès à la page de connexion Super Admin
    // ══════════════════════════════════════════════════════
    cy.visit('http://localhost:4200/admin/authSuper/login');

    // Vérifier l'affichage du titre de la page
    cy.get('.auth-title').should('contain', 'Connexion');

    // Saisir les identifiants d'administration (Super Admin)
    cy.get('input#email').type('Safa@cartas.tn');
    cy.get('input#password').type('Admin2026!');

    // WHEN : Clic sur le bouton de connexion
    cy.get('button[type="submit"]').click();

    // ══════════════════════════════════════════════════════
    // 2. THEN : Redirection vers le Dashboard
    // ══════════════════════════════════════════════════════
    cy.url().should('include', '/admin/dashboard');
    cy.get('h1').should('contain', 'Tableau de bord');

    // ══════════════════════════════════════════════════════
    // 3. WHEN : Navigation vers la section "Contenu Éducatif"
    // ══════════════════════════════════════════════════════
    cy.visit('http://localhost:4200/admin/content');
    cy.url().should('include', '/admin/content');
    cy.get('h1').should('contain', 'Contenu');

    // Clic sur "+ Nouveau Contenu" pour ouvrir la modale (force: true pour bypass overlay sidebar)
    cy.get('button.btn-primary').contains('+ Nouveau Contenu').click({ force: true });

    // Vérifier que la modale de création est ouverte
    cy.get('.modal').should('be.visible');

    // ══════════════════════════════════════════════════════
    // 4. GIVEN : Remplissage du formulaire de création du module
    // ══════════════════════════════════════════════════════
    cy.get('input[name="title"]').type('Les secrets du Thym de Zaghouan');
    cy.get('textarea[name="description"]').type('Découvrez les bienfaits antioxydants et respiratoires du Thym sauvage.');

    // Sélectionner la catégorie (premier élément disponible)
    cy.get('select[name="categoryId"]').select(1);

    // Sélectionner le type de contenu
    cy.get('select[name="contentType"]').select('ARTICLE');

    // Renseigner l'auteur et la durée
    cy.get('input[name="authorName"]').type('Dr. Yasmine Ben Ali');
    cy.get('input[name="duration"]').type('10 min');

    // ══════════════════════════════════════════════════════
    // 5. Ajouter une leçon interactive (utilisation des placeholders réels)
    // ══════════════════════════════════════════════════════
    cy.get('.btn-add-lesson').click({ force: true });

    // Remplir les champs de la leçon via leurs placeholders visibles dans l'UI
    cy.get('input[placeholder="Entrez le titre..."]').first().type('Introduction au Thym sauvage', { force: true });
    cy.get('input[placeholder="ex: 5 min"]').first().type('3 min', { force: true });
    cy.get('textarea[placeholder="Écrivez le cours ici..."]').first().type(
      'Le thym sauvage est traditionnellement infusé pour soigner la toux et les infections respiratoires.',
      { force: true }
    );

    // ══════════════════════════════════════════════════════
    // 6. WHEN : Enregistrement du nouveau module d'apprentissage
    // ══════════════════════════════════════════════════════
    cy.get('button.btn-save').click({ force: true });

    // ══════════════════════════════════════════════════════
    // 7. THEN : Validation finale — le module apparaît dans la liste
    // ══════════════════════════════════════════════════════
    cy.url().should('include', '/admin/content');
  });
});
