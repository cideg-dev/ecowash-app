# EcoWash - Application Publique

Application PWA de communication pour EcoWash, lavage auto sans eau.

## Fonctionnalités

- **Landing page** : présentation du produit, avantages
- **Tarifs** : 3 forfaits (Simple 1 500 FCFA, Complet 2 500 FCFA, Premium 4 000 FCFA)
- **Rendez-vous** : formulaire de réservation avec date, créneau, type de véhicule et moyen de paiement
- **Avis clients** : affichage et soumission d'avis avec notation par étoiles
- **Contact** : formulaire de contact avec stockage local + envoi email (Formspree)
- **WhatsApp** : bouton flottant de contact direct
- **Admin** : tableau de bord protégé (messages, rendez-vous, avis) — accessible via `/admin.html`
- **PWA** : installation sur mobile (standalone, offline)
- **Animations** : apparition au scroll

## Configuration

Éditer `js/config.js` :

```js
var CONFIG = {
    whatsapp: { number: '225XXXXXXXXX', message: '...' },
    email: {
        service: 'formspree',
        endpoint: 'https://formspree.io/f/votre-endpoint'  // créer un compte gratuit sur formspree.io
    },
    admin: { password: 'votre-mot-de-passe' }
};
```

## Déploiement

https://cideg-dev.github.io/ecowash-app/
