# Maileed

Landing page one-page pour **Maileed**, agence B2B de cold email IA.

Stack : **React + Vite**, **Framer Motion** (animations au scroll), **tsParticles** (fond animé), **Tailwind CSS**.

## Prérequis

Node.js 18+ et npm.

> ⚠️ Node n'était pas installé sur cette machine. Installe-le via [nodejs.org](https://nodejs.org) ou `brew install node`, puis lance les commandes ci-dessous.

## Démarrer

```bash
npm install      # installer les dépendances
npm run dev      # serveur de dev sur http://localhost:5173
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Structure

```
src/
  App.jsx                  # assemble toutes les sections
  index.css                # styles globaux + classes utilitaires (glass-card, btn, text-gradient)
  lib/motion.js            # variants Framer Motion partagés (fadeInUp, stagger…)
  components/
    Navbar.jsx             # nav fixe, blur, menu mobile
    ParticlesBackground.jsx# particules violettes en fond
    AnimatedCounter.jsx    # compteurs animés au scroll
    Section.jsx, Logo.jsx
  sections/
    Hero.jsx  Metrics.jsx  ProblemSolution.jsx  Process.jsx
    CaseStudy.jsx  Pricing.jsx  Faq.jsx  FinalCta.jsx  Footer.jsx
```

## Personnalisation

- **Couleurs** : `tailwind.config.js` (`base` #0A0A0F, `primary` #1F1345, `accent` #6C3FC8).
- **Contenu** : chaque section est un fichier autonome dans `src/sections/`.
- **CTA** : les boutons « Réserver un appel » pointent vers `#contact` ; le bouton final ouvre un `mailto:` — remplace par ton lien Calendly/Cal.com.
- **LinkedIn** : mets l'URL réelle dans `src/sections/Footer.jsx`.
