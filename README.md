# EcoWash - Application PWA de Lavage Auto Sans Eau

Progressive Web App complète pour la gestion de lavage automobile écologique au Bénin.

## Fonctionnalités

### Clients
- Réservation en ligne (4 étapes : véhicule, date, adresse, confirmation)
- Paiement Mobile Money (Orange Money, MTN, Moov, Wave) avec simulation
- Dashboard client : historique, badges, points fidélité, impact écologique
- Défis & gamification avec récompenses
- Programme de fidélité (points + paliers)
- Parrainage (code de parrainage, QR code)
- Carte interactive des zones d'intervention (Leaflet)
- Assistant vocal (Web Speech API)
- Chat en direct

### Prestataires
- Onglet Prestataire dans l'admin
- Interventions du jour avec mise à jour de statut
- Upload photos avant/après
- Assignation des prestataires aux rendez-vous

### Administration
- Tableau de bord avec statistiques avancées
- Gestion des messages, rendez-vous, avis
- Calendrier des rendez-vous
- Analytics (graphiques, revenus, services populaires)
- Gestion des stocks produits
- Gestion des codes promo
- Blog CMS (articles modifiables)
- Export CSV (clients, messages, rendez-vous)
- Sauvegarde/Restauration JSON
- Sync multi-appareils par QR code

### Technique
- PWA : installation sur écran d'accueil, mode hors-ligne
- Service worker v3 : cache, notifications, rappels
- Thème sombre automatique (prefers-color-scheme)
- Multilingue (FR/EN)
- SEO : JSON-LD, balises OG, sitemap.xml
- Accessibilité : skip link, ARIA

## Installation

1. Cloner le dépôt
2. Ouvrir `index.html` dans un navigateur
3. Pour installer en PWA, cliquer sur "Installer" dans la barre d'invite

## Configuration

Tous les paramètres sont dans `js/config.js` :
- Coordonnées de l'entreprise
- Zones d'intervention
- Moyens de paiement
- Créneaux horaires
- Codes promo
- Prestataires
- Produits et stocks

Mot de passe admin par défaut : `ecowash2026`

## Technologies

- Vanilla JS (ES5 compatible)
- localStorage / IndexedDB
- Leaflet (cartes interactives)
- Web Speech API
- Service Worker
- Manifest JSON

## Déploiement

Hébergé sur GitHub Pages : https://cideg-dev.github.io/ecowash-app/

## Licence

MIT
