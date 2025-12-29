document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 SPEEDNEWS chargé avec succès !');
  
  // Éléments DOM
  const langueSelect = document.getElementById('langue-select');
  const langueAffichee = document.getElementById('langue-affichee');
  const compteurVisites = document.getElementById('compteur-visites');
  const heureActuelle = document.getElementById('heure-actuelle');
  const searchBar = document.getElementById('search-bar');
  const cards = document.querySelectorAll('.card');
  
  // === 1. GESTION DE LA LANGUE ===
  if (langueSelect) {
    langueSelect.addEventListener('change', function() {
      const langue = this.options[this.selectedIndex].text;
      const code = this.value;
      
      langueAffichee.innerHTML = `Information en <strong>${langue}</strong> • Actualités Cameroun & Monde`;
      localStorage.setItem('speednews_langue', code);
      showNotification(`Langue changée : ${langue}`);
    });
    
    const langueSauvee = localStorage.getItem('speednews_langue');
    if (langueSauvee) {
      langueSelect.value = langueSauvee;
    }
  }
  
  // === 2. COMPTEUR DE VISITES ===
  let visites = parseInt(localStorage.getItem('speednews_visites')) || 0;
  visites++;
  localStorage.setItem('speednews_visites', visites);
  if (compteurVisites) {
    compteurVisites.textContent = `👁️ Nombre de visites : ${visites}`;
  }
  
  // === 3. HEURE ACTUELLE (Fuseau Cameroun) ===
  function updateHeure() {
    if (heureActuelle) {
      const maintenant = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Douala'
      };
      
      heureActuelle.textContent = `🕒 Dernière mise à jour : ${maintenant.toLocaleDateString('fr-FR', options)}`;
    }
  }
  
  updateHeure();
  setInterval(updateHeure, 60000);
  
  // === 4. BOUTONS INTERACTIFS ===
  document.querySelectorAll('.lire-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const articleId = this.getAttribute('data-article');
      showNotification(`📖 Ouverture de l'article : ${articleId}`);
    });
  });
  
  document.querySelectorAll('.audio-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const langue = this.getAttribute('data-lang');
      const messages = {
        'fr': 'Écoute en cours...',
        'pidgin': 'Di audio dey play now...',
        'duala': 'Audio e yembé...',
        'ewondo': 'Audio a síga...'
      };
      showNotification(`🔊 ${messages[langue] || 'Lecture audio...'}`);
    });
  });
  
  // === 5. RECHERCHE ===
  if (searchBar) {
    searchBar.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      let found = 0;
      
      cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        const tag = card.querySelector('.tag').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm) || tag.includes(searchTerm)) {
          card.style.display = 'block';
          found++;
        } else {
          card.style.display = 'none';
        }
      });
      
      if (searchTerm && found === 0) {
        showNotification(`❌ Aucun résultat pour "${searchTerm}"`);
      }
    });
  }
  
  // === 6. FILTRES PAR TAG ===
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
      const categorie = this.textContent.toLowerCase();
      cards.forEach(card => {
        const cardCategorie = card.getAttribute('data-categorie');
        if (cardCategorie === categorie) {
          card.style.display = 'block';
          card.style.animation = 'highlight 0.5s';
        }
      });
      showNotification(`🏷️ Filtre : ${categorie}`);
    });
  });
  
  // === 7. MODE CLAIR/SOMBRE ===
  const modeToggle = document.createElement('button');
  modeToggle.id = 'mode-toggle';
  modeToggle.textContent = '🌙 Mode Sombre';
  modeToggle.title = 'Changer le thème';
  document.body.appendChild(modeToggle);
  
  modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
      this.textContent = '☀️ Mode Clair';
      localStorage.setItem('speednews_mode', 'clair');
    } else {
      this.textContent = '🌙 Mode Sombre';
      localStorage.setItem('speednews_mode', 'sombre');
    }
  });
  
  // Restaurer le mode
  const modeSauve = localStorage.getItem('speednews_mode');
  if (modeSauve === 'clair') {
    document.body.classList.add('light-mode');
    modeToggle.textContent = '☀️ Mode Clair';
  }
  
  // === FONCTION NOTIFICATION ===
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // === 8. CONFIRMATION DE CHARGEMENT ===
  setTimeout(() => {
    showNotification('✅ SPEEDNEWS prêt ! Bienvenue !');
  }, 1000);
  
  console.log('✅ Toutes les fonctionnalités sont activées !');
});