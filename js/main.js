/**
 * ===========================================
 * 1. CURSEUR PERSONNALISÉ AVEC EFFET DE TRAÎNÉE
 * ===========================================
 * Crée un curseur personnalisé avec un effet de traînée
 */

// Sélectionne l'élément du curseur personnalisé
const cursor = document.querySelector('.cursor');
// Tableau pour stocker les éléments de traînée du curseur
const cursorTrails = [];

// Crée 5 éléments de traînée pour le curseur
for (let i = 0; i < 5; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';  // Classe CSS pour le style des traînées
    document.body.appendChild(trail);   // Ajoute la traînée au document
    cursorTrails.push(trail);          // Stocke la référence dans le tableau
}

// Variables pour suivre la position de la souris
let mouseX = 0, mouseY = 0;

// Met à jour la position du curseur en fonction du mouvement de la souris
document.addEventListener('mousemove', (e) => {
    // Enregistre les coordonnées actuelles de la souris
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Déplace le curseur principal vers la position de la souris
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

/**
 * Anime les traînées du curseur avec un léger décalage
 * pour créer un effet de traînée fluide
 */
setInterval(() => {
    cursorTrails.forEach((trail, index) => {
        // Chaque traînée suit avec un léger délai pour créer l'effet de traînée
        setTimeout(() => {
            trail.style.left = mouseX + 'px';
            trail.style.top = mouseY + 'px';
        }, index * 50);  // Délai progressif pour chaque traînée
    });
}, 50);  // Rafraîchit la position toutes les 50ms

/**
 * ===========================================
 * 2. ÉCRAN DE CHARGEMENT
 * ===========================================
 * Affiche un écran de chargement au démarrage de la page
 * puis effectue une transition en fondu pour le masquer
 */
window.addEventListener('load', () => {
    // Attend 3 secondes avant de commencer la disparition
    setTimeout(() => {
        // Fait disparaître progressivement l'écran de chargement
        document.getElementById('loader').style.opacity = '0';
        
        // Après la fin de l'animation de fondu, masque complètement l'élément
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);  // Délai correspondant à la durée de la transition CSS
    }, 3000);  // Délai avant le début de la disparition
});

/**
 * ===========================================
 * 3. PARTICULES FLOTTANTES
 * ===========================================
 * Crée des particules animées en arrière-plan
 * pour un effet visuel dynamique
 */
function createParticles() {
    // Récupère le conteneur des particules
    const particlesContainer = document.getElementById('particles');
    
    // Crée 50 particules avec des propriétés aléatoires
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';  // Classe CSS pour le style des particules
        
        // Position aléatoire horizontale (0% à 100%)
        particle.style.left = Math.random() * 100 + '%';
        
        // Délai d'animation aléatoire pour varier le démarrage
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Durée d'animation aléatoire entre 10 et 20 secondes
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Ajoute la particule au conteneur
        particlesContainer.appendChild(particle);
    }
}

// Appelle la fonction pour créer les particules au chargement de la page
createParticles();

/**
 * ===========================================
 * 4. ANIMATION DE FRAPPE TERMINAL
 * ===========================================
 * Simule une frappe au clavier pour le texte du terminal
 */

// Texte à afficher avec l'effet de frappe
const terminalText = "Développeur passionné par l'IA • Vibe Coder • Toujours prêt à apprendre avec les machines ! 🚀";
// Élément HTML où le texte sera affiché
const typingElement = document.getElementById('typing-text');
// Compteur pour suivre la position dans le texte
let i = 0;

/**
 * Fonction récursive pour l'effet de frappe
 * Ajoute un caractère à la fois avec un léger délai
 */
function typeWriter() {
    // Vérifie si on n'a pas atteint la fin du texte
    if (i < terminalText.length) {
        // Ajoute le caractère suivant
        typingElement.textContent += terminalText.charAt(i);
        i++;
        // Appelle récursivement la fonction avec un délai
        setTimeout(typeWriter, 100);  // 100ms entre chaque caractère
    }
}

// Démarre l'animation après un délai de 2 secondes
setTimeout(typeWriter, 2000);

/**
 * ===========================================
 * 5. ANIMATIONS DE RÉVÉLATION AU SCROLL
 * ===========================================
 * Fait apparaître les éléments lorsqu'ils entrent dans la vue
 * avec une animation fluide
 */

// Options pour l'Intersection Observer
const observerOptions = {
    threshold: 0.1,  // Déclenche lorsque 10% de l'élément est visible
    rootMargin: '0px 0px -50px 0px'  // Décale la zone de déclenchement vers le haut de 50px
};

// Crée un nouvel Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Vérifie si l'élément est dans la vue
        if (entry.isIntersecting) {
            // Ajoute la classe 'active' pour déclencher l'animation
            entry.target.classList.add('active');
            
            // Traitement spécial pour la section des compétences
            if (entry.target.id === 'competences') {
                // Récupère toutes les barres de compétences
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                
                // Anime chaque barre de compétence
                skillBars.forEach(bar => {
                    // Récupère la largeur cible depuis l'attribut data-width
                    const width = bar.getAttribute('data-width');
                    
                    // Anime la largeur de la barre après un court délai
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 500);  // Délai pour un effet d'animation en cascade
                });
            }
        }
    });
}, observerOptions);

// Observe tous les éléments avec la classe 'reveal'
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

/**
 * ===========================================
 * 6. NAVIGATION FLUIDE
 * ===========================================
 * Permet un défilement fluide vers les sections
 * lors du clic sur les liens de navigation
 */
document.querySelectorAll('nav a').forEach(anchor => {
    // Ajoute un écouteur d'événement à chaque lien de navigation
    anchor.addEventListener('click', function (e) {
        e.preventDefault();  // Empêche le comportement par défaut du lien
        
        // Récupère la cible du lien (l'ID de la section)
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Fait défiler jusqu'à la section cible de manière fluide
            target.scrollIntoView({
                behavior: 'smooth',  // Animation de défilement fluide
                block: 'start'        // Aligne le haut de l'élément avec le haut de la zone visible
            });
        }
    });
});

/**
 * ===========================================
 * 7. EFFET 3D AU SURVOL DES CARTES DE PROJET
 * ===========================================
 * Crée un effet 3D qui fait pivoter les cartes
 * en fonction de la position de la souris
 */
document.querySelectorAll('.project-card').forEach(card => {
    // Événement déclenché lorsque la souris se déplace sur une carte
    card.addEventListener('mousemove', (e) => {
        // Calcule la position de la souris par rapport à la carte
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;  // Position X relative à la carte
        const y = e.clientY - rect.top;   // Position Y relative à la carte
        
        // Calcule le centre de la carte
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calcule les angles de rotation en fonction de la position de la souris
        // Divisé par 10 pour réduire l'intensité de la rotation
        const rotateX = (y - centerY) / 10;  // Rotation autour de l'axe X
        const rotateY = (centerX - x) / 10;  // Rotation autour de l'axe Y
        
        // Applique la transformation 3D
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    // Réinitialise la transformation lorsque la souris quitte la carte
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    });
});

/**
 * ===========================================
 * 8. EFFET DE PARALLAXE
 * ===========================================
 * Crée un effet de défilement à différentes vitesses
 * pour les éléments en arrière-plan
 */
window.addEventListener('scroll', () => {
    // Récupère la position de défilement verticale
    const scrolled = window.pageYOffset;
    // Sélectionne l'élément avec l'effet de parallaxe
    const parallax = document.querySelector('.parallax');
    
    if (parallax) {
        // Calcule le décalage en fonction du défilement
        // (multiplié par 0.5 pour réduire l'intensité)
        const speed = scrolled * 0.5;
        // Applique la transformation de translation
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

/**
 * ===========================================
 * 9. EASTER EGG - KONAMI CODE
 * ===========================================
 * Cache une fonctionnalité secrète activable
 * avec la célèbre combinaison Konami
 */
// Séquence du code Konami : Haut, Haut, Bas, Bas, Gauche, Droite, Gauche, Droite, B, A
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;  // Suivi de la position dans la séquence

// Écoute les événements de touche du clavier
document.addEventListener('keydown', (e) => {
    // Vérifie si la touche pressée correspond à la séquence attendue
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;  // Passe à la touche suivante de la séquence
        
        // Vérifie si toute la séquence a été entrée correctement
        if (konamiIndex === konamiCode.length) {
            // Active l'easter egg
            document.body.style.animation = 'rainbow 0.5s infinite';  // Animation arc-en-ciel
            
            // Désactive l'animation après 2 secondes
            setTimeout(() => {
                document.body.style.animation = '';  // Supprime l'animation
                // Affiche un message de félicitations
                alert('🎉 Easter egg trouvé ! Tu es un vrai vibe coder ! 🤖');
            }, 2000);
            
            konamiIndex = 0;  // Réinitialise pour une utilisation ultérieure
        }
    } else {
        // Réinitialise la séquence si la touche est incorrecte
        konamiIndex = 0;
    }
});