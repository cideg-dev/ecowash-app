var CONFIG = {
    business: {
        name: 'EcoWash',
        slogan: 'La révolution du lavage auto sans eau en Afrique',
        email: 'contact@ecowash.africa',
        phone: '+229 XX XX XX XX',
        hours: 'Lun-Sam 08h00-18h00',
        areas: ['Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi', 'Bohicon', 'Ouidah', 'Lokossa', 'Natitingou'],
        currency: { symbol: 'F', code: 'FCFA', locale: 'fr-FR' }
    },
    whatsapp: {
        number: '229XXXXXXXXX',
        message: 'Bonjour EcoWash Bénin ! J\'ai besoin d\'informations'
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
        methods: ['Orange Money', 'MTN Mobile Money', 'Moov Money', 'Wave', 'Espèces'],
        currency: 'FCFA'
    },
    social: {
        facebook: 'https://facebook.com/ecowashbenin',
        instagram: 'https://instagram.com/ecowashbenin',
        whatsapp: 'https://wa.me/229XXXXXXXXX'
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
        shippingCost: 1500,
        freeShippingAbove: 30000
    },
    providers: [
        { name: 'Jean', phone: '+229 01 02 03 04', active: true },
        { name: 'Marie', phone: '+229 05 06 07 08', active: true },
        { name: 'Paul', phone: '+229 09 10 11 12', active: true }
    ],
    recurrence: {
        options: ['une_fois', 'chaque_semaine', 'toutes_2_semaines', 'chaque_mois'],
        maxRecurrences: 12
    }
};
