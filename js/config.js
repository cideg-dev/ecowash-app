var CONFIG = {
    business: {
        name: 'EcoWash',
        slogan: 'La révolution du lavage auto sans eau en Afrique',
        email: 'contact@ecowash.africa',
        phone: '+225 XX XX XX XX',
        hours: 'Lun-Sam 08h00-18h00',
        areas: ['Abidjan', 'Cocody', 'Plateau', 'Treichville', 'Yopougon', 'Marcory', 'Bingerville', 'Grand-Bassam'],
        currency: { symbol: 'F', code: 'FCFA', locale: 'fr-FR' }
    },
    whatsapp: {
        number: '225XXXXXXXXX',
        message: 'Bonjour EcoWash ! J\'ai besoin d\'informations'
    },
    email: {
        service: 'formspree',
        endpoint: 'https://formspree.io/f/xxxxxxxx'
    },
    admin: {
        password: 'ecowash2026',
        notificationEmail: 'contact@ecowash.africa'
    },
    booking: {
        interval: 60,
        maxDaysAhead: 30,
        timeSlots: ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00'],
        minNoticeHours: 2
    },
    payment: {
        methods: ['Orange Money', 'MTN Mobile Money', 'Wave', 'Espèces', 'Carte bancaire'],
        currency: 'FCFA'
    },
    social: {
        facebook: 'https://facebook.com/ecowash',
        instagram: 'https://instagram.com/ecowash',
        whatsapp: 'https://wa.me/225XXXXXXXXX'
    },
    theme: {
        default: 'light',
        allowToggle: true,
        primaryColor: '#2ecc71'
    },
    notifications: {
        push: true,
        reminderHours: 24,
        sound: true
    },
    products: {
        shippingCost: 2000,
        freeShippingAbove: 50000
    }
};
