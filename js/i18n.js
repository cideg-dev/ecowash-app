var LANG = { current: 'fr' };

var TR = {
    fr: {
        nav: { accueil: 'Accueil', produit: 'Produit', catalogue: 'Catalogue', tarifs: 'Tarifs', rendezvous: 'Rendez-vous', avis: 'Avis', contact: 'Contact', faq: 'FAQ' },
        hero: { title: 'EcoWash', subtitle: 'La révolution du lavage auto sans eau en Afrique', desc: 'Propre, économique, écologique. Moins de 0,5L d\'eau par véhicule.', btn: 'Réserver un lavage' },
        produit: { title: 'Notre Produit', cards: [
            { icon: '\u{1F4A7}', title: '0% Eau', desc: 'Nettoyage complet sans eau. Formule concentrée spray : 0,3 à 0,5L par véhicule.' },
            { icon: '\u{1F30E}', title: 'Écologique', desc: 'Produit biodégradable, respectueux de l\'environnement et de la peinture.' },
            { icon: '\u{1F4B0}', title: 'Économique', desc: 'Prix populaires entre 1 000 et 2 000 FCFA par lavage.' },
            { icon: '\u{1F697}', title: 'Protection', desc: 'Formule anti-rayures et restauration de couleur.' }
        ]},
        tarifs: { title: 'Nos Tarifs' },
        rendezvous: { title: 'Prendre Rendez-vous', desc: 'Choisissez une date et un créneau, nous venons à vous !', btn: 'Confirmer le rendez-vous' },
        avis: { title: 'Avis Clients', add: 'Donnez votre avis', publish: 'Publier' },
        contact: { title: 'Contactez-nous', desc: 'Écrivez-nous !', btn: 'Envoyer' },
        footer: { rights: 'Tous droits réservés.' },
        cart: { empty: 'Votre panier est vide', total: 'Total', checkout: 'Commander' },
        faq: { title: 'Questions fréquentes' },
        gallery: { title: 'Avant / Après' },
        zones: { title: 'Zones d\'intervention' },
        chat: { placeholder: 'Écrivez votre message...', btn: 'Envoyer' },
        dark: 'Mode sombre',
        lang: 'Langue',
        booking: { success: 'Rendez-vous confirmé ! Nous arriverons à l\'heure choisie.' },
        form: { success: 'Merci pour votre message !' }
    },
    en: {
        nav: { accueil: 'Home', produit: 'Product', catalogue: 'Catalog', tarifs: 'Pricing', rendezvous: 'Booking', avis: 'Reviews', contact: 'Contact', faq: 'FAQ' },
        hero: { title: 'EcoWash', subtitle: 'The waterless car wash revolution in Africa', desc: 'Clean, economical, ecological. Less than 0.5L per vehicle.', btn: 'Book a wash' },
        produit: { title: 'Our Product', cards: [
            { icon: '\u{1F4A7}', title: '0% Water', desc: 'Complete cleaning without water. Concentrated spray formula: 0.3 to 0.5L per vehicle.' },
            { icon: '\u{1F30E}', title: 'Eco-Friendly', desc: 'Biodegradable product, respectful of the environment and your paint.' },
            { icon: '\u{1F4B0}', title: 'Affordable', desc: 'Popular prices between 1,000 and 2,000 FCFA per wash.' },
            { icon: '\u{1F697}', title: 'Protection', desc: 'Anti-scratch formula and color restoration.' }
        ]},
        tarifs: { title: 'Our Prices' },
        rendezvous: { title: 'Book an Appointment', desc: 'Pick a date and time slot, we come to you!', btn: 'Confirm Booking' },
        avis: { title: 'Customer Reviews', add: 'Leave a review', publish: 'Publish' },
        contact: { title: 'Contact Us', desc: 'Write to us!', btn: 'Send' },
        footer: { rights: 'All rights reserved.' },
        cart: { empty: 'Your cart is empty', total: 'Total', checkout: 'Checkout' },
        faq: { title: 'Frequently Asked Questions' },
        gallery: { title: 'Before / After' },
        zones: { title: 'Service Areas' },
        chat: { placeholder: 'Type your message...', btn: 'Send' },
        dark: 'Dark mode',
        lang: 'Language',
        booking: { success: 'Booking confirmed! We will arrive on time.' },
        form: { success: 'Thank you for your message!' }
    }
};

function t(section, key) {
    try {
        if (key === undefined) return TR[LANG.current][section];
        return TR[LANG.current][section][key];
    } catch (e) { return ''; }
}

function switchLang(lang) {
    LANG.current = lang;
    localStorage.setItem('ecowash_lang', lang);
    applyTranslations();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var parts = el.getAttribute('data-i18n').split('.');
        var val = t(parts[0], parts[1]);
        if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        var parts = el.getAttribute('data-i18n-placeholder').split('.');
        var val = t(parts[0], parts[1]);
        if (val) el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-btn]').forEach(function(el) {
        var parts = el.getAttribute('data-i18n-btn').split('.');
        var val = t(parts[0], parts[1]);
        if (val) el.value = val;
    });
}
