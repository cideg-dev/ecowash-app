document.addEventListener('DOMContentLoaded', function () {
    window.C = typeof CONFIG !== 'undefined' ? CONFIG : {};
    var savedLang = localStorage.getItem('ecowash_lang');
    if (savedLang) { LANG.current = savedLang; }

    initNav();
    initTheme();
    initLang();
    initAnimations();
    initWhatsApp();
    initProductCards();
    initGallery();
    initZones();
    initFAQ();
    initBooking();
    initReviews();
    initContactForm();
    initCart();
    initChat();
    initTracking();
    initInvoiceLink();
    initNotifications();
    initFooter();

    applyTranslations();
    setTimeout(function () { Cart.updateBadge(); }, 100);
    initImpact();
    setTimeout(function () { initTestiCarousel(); }, 600);
    initReferral();
    initPWAInstall();
    initCatalogCartButtons();
    initBlog();
    initLoyalty();
    initPromo();
    initCookies();
    initSteps();
    initTrust();
    initSavingsCalc();
    initUrgenceTimer();
    initSocialProof();
    initPricing();
    initCompareSlider();
    initVideoDemo();
    initBackToTop();
    initFormValidation();
    initExitPopup();
    initLightbox();
    initGeoZone();
    initOfflineIndicator();
    initVehicleProfiles();
    initOnboarding();
    initSocialShare();
    initNotifPrefs();

    showStep(1);
});

function initNav() {
    var toggle = document.querySelector('.menu-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('active');
        });
    }
    if (links) {
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function (e) {
                links.classList.remove('active');
                var href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    var target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
}

function initTheme() {
    var btn = document.getElementById('theme-toggle');
    var saved = localStorage.getItem('ecowash_theme') || C.theme?.default || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    if (btn) {
        btn.textContent = saved === 'dark' ? '\u2600' : '\u{1F319}';
        btn.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('ecowash_theme', next);
            btn.textContent = next === 'dark' ? '\u2600' : '\u{1F319}';
            var meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', next === 'dark' ? '#0f0f23' : '#2ecc71');
        });
    }
}

function initLang() {
    var btn = document.getElementById('lang-toggle');
    if (btn) {
        btn.textContent = LANG.current.toUpperCase();
        btn.addEventListener('click', function () {
            var next = LANG.current === 'fr' ? 'en' : 'fr';
            switchLang(next);
            btn.textContent = next.toUpperCase();
        });
    }
}

function initAnimations() {
    function check() {
        document.querySelectorAll('.fade-in').forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    check();
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () { check(); ticking = false; });
            ticking = true;
        }
    });
}

function initWhatsApp() {
    var btn = document.getElementById('whatsapp-btn');
    if (btn && C.whatsapp) {
        btn.href = 'https://wa.me/' + C.whatsapp.number + '?text=' + encodeURIComponent(C.whatsapp.message);
    }
}

function initProductCards() {
    var container = document.getElementById('product-cards');
    if (!container) return;
    var cards = t('produit', 'cards');
    if (!cards) {
        cards = [
            { icon: '\u{1F4A7}', title: '0% Eau', desc: 'Nettoyage complet sans eau. Formule concentrée spray : 0,3 à 0,5L par véhicule.' },
            { icon: '\u{1F30E}', title: 'Écologique', desc: 'Produit biodégradable, respectueux de l\'environnement et de la peinture.' },
            { icon: '\u{1F4B0}', title: 'Économique', desc: 'Prix populaires entre 1 000 et 2 000 FCFA par lavage.' },
            { icon: '\u{1F697}', title: 'Protection', desc: 'Formule anti-rayures et restauration de couleur.' }
        ];
    }
    var html = '';
    cards.forEach(function (c) {
        html += '<div class="card fade-in"><div class="icon">' + c.icon + '</div><h3>' + c.title + '</h3><p>' + c.desc + '</p></div>';
    });
    container.innerHTML = html;
}

function initGallery() {
    var container = document.getElementById('gallery-grid');
    if (!container) return;
    var items = [
        { label: 'Avant : peinture pâlie par le soleil', bg: 'linear-gradient(135deg,#ddd,#bbb)' },
        { label: 'Après : restauration couleur EcoWash', bg: 'linear-gradient(135deg,var(--primary),var(--primary-dark))' },
        { label: 'Avant : saleté incrustée sur carrosserie', bg: 'linear-gradient(135deg,#bbb,#999)' },
        { label: 'Après : brillance et protection', bg: 'linear-gradient(135deg,var(--primary),#1a9e4e)' },
        { label: 'Avant : jantes encrassées', bg: 'linear-gradient(135deg,#999,#777)' },
        { label: 'Après : jantes comme neuves', bg: 'linear-gradient(135deg,var(--primary),#2ecc71)' }
    ];
    var html = '';
    items.forEach(function (item) {
        html += '<div class="gallery-card fade-in" style="background:' + item.bg + ';display:flex;align-items:center;justify-content:center;color:white;font-size:2rem;font-weight:700">' +
            '<div class="gallery-label">' + item.label + '</div></div>';
    });
    container.innerHTML = html;
}

function initZones() {
    var container = document.getElementById('zones-grid');
    if (!container) return;
    var zones = C.business?.areas || ['Abidjan', 'Cocody', 'Plateau', 'Treichville', 'Yopougon', 'Marcory'];
    var html = zones.map(function (z) { return '<div class="zone-chip active">' + z + '</div>'; }).join('');
    container.innerHTML = html;
}

function initFAQ() {
    var container = document.getElementById('faq-list');
    if (!container) return;
    var faqs = [
        { q: 'Combien de temps dure un lavage ?', a: 'Comptez 10-15 min pour un Express, 25-30 min pour un Complet, 40-45 min pour un Premium.' },
        { q: 'Le produit abîme-t-il la peinture ?', a: 'Non, notre formule est spécialement conçue pour lubrifier la saleté et éviter les rayures. Elle contient des polymères protecteurs qui nourrissent la peinture.' },
        { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons Orange Money, MTN Mobile Money, Wave, les espèces et la carte bancaire.' },
        { q: 'Puis-je commander vos produits pour les utiliser moi-même ?', a: 'Oui ! Nous avons des sprays prêts à l\'emploi pour particuliers (500 ml à 5 000 F) et des formats professionnels.' },
        { q: 'Intervenez-vous dans toute la ville ?', a: 'Nous couvrons plusieurs zones. Consultez notre section "Zones d\'intervention" pour vérifier si nous desservons votre quartier.' },
        { q: 'Que faire si je ne suis pas satisfait ?', a: 'Votre satisfaction est notre priorité. Si le résultat ne vous convient pas, nous revenons gratuitement pour corriger.' },
        { q: 'Proposez-vous des abonnements ?', a: 'Oui ! Économisez jusqu\'à 30% avec nos formules Essentiel (7 000 F/mois), Régulier (12 000 F/mois) ou Premium (25 000 F/mois).' },
        { q: 'Le lavage sans eau fonctionne-t-il sur les motos ?', a: 'Absolument ! Nous avons un forfait spécial moto à 500 F avec un temps d\'intervention de 5-7 min.' }
    ];
    var html = '';
    faqs.forEach(function (f, i) {
        html += '<div class="faq-item fade-in"><div class="faq-q" onclick="toggleFAQ(this)">' + f.q +
            '<span class="arrow">&#9660;</span></div><div class="faq-a">' + f.a + '</div></div>';
    });
    container.innerHTML = html;
}

function toggleFAQ(el) {
    el.parentElement.classList.toggle('open');
}

function initBooking() {
    var dateInput = document.getElementById('bk-date');
    if (dateInput) {
        var today = new Date();
        dateInput.setAttribute('min', today.toISOString().split('T')[0]);
        if (C.booking?.maxDaysAhead) {
            var max = new Date(today);
            max.setDate(max.getDate() + C.booking.maxDaysAhead);
            dateInput.setAttribute('max', max.toISOString().split('T')[0]);
        }
    }

    var timeSelect = document.getElementById('bk-time');
    if (timeSelect) {
        var slots = C.booking?.timeSlots || ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00'];
        slots.forEach(function (s) {
            var opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s.substr(0,2) + 'h' + s.substr(3,2) + ' - ' + (parseInt(s)+1 < 10 ? '0' : '') + (parseInt(s)+1) + 'h' + s.substr(3,2);
            timeSelect.appendChild(opt);
        });
    }

    var paySelect = document.getElementById('bk-payment');
    if (paySelect && C.payment?.methods) {
        C.payment.methods.forEach(function (m) {
            var opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            paySelect.appendChild(opt);
        });
    }

    var form = document.getElementById('booking-form');
    var success = document.getElementById('bk-success');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = {
                id: 'BK-' + Date.now(),
                name: document.getElementById('bk-name').value.trim(),
                phone: document.getElementById('bk-phone').value.trim(),
                address: document.getElementById('bk-address').value.trim(),
                vehicle: document.getElementById('bk-vehicle').value,
                service: document.getElementById('bk-service').value,
                date: document.getElementById('bk-date').value,
                time: document.getElementById('bk-time').value,
                payment: document.getElementById('bk-payment').value,
                notes: document.getElementById('bk-notes').value.trim(),
                status: 'confirmé',
                created: new Date().toISOString()
            };
            if (!data.name || !data.phone || !data.address || !data.date) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            saveLocal('ecowash_bookings', data);
            localStorage.setItem('ecowash_last_booking', JSON.stringify(data));
            scheduleBookingReminder(data);
            form.reset();
            if (success) {
                success.classList.remove('hidden');
                setTimeout(function () { success.classList.add('hidden'); }, 6000);
            }
            showTracking(data);
            requestNotify();
        });
    }
}

function showTracking(data) {
    var card = document.getElementById('tracking-card');
    var steps = document.getElementById('tracking-steps');
    var info = document.getElementById('tracking-info');
    if (!card || !steps) return;
    card.style.display = 'block';
    var labels = ['Confirmé', 'En préparation', 'En route', 'En cours', 'Terminé'];
    var html = '';
    labels.forEach(function (l, i) {
        var cls = i === 0 ? 'active' : '';
        html += '<div class="t-step ' + cls + '"><div class="dot">' + (i + 1) + '</div><div class="t-label">' + l + '</div></div>';
    });
    steps.innerHTML = html;
    if (info) info.textContent = 'Rendez-vous #' + data.id + ' - ' + data.service + ' - ' + data.date + ' à ' + data.time;
}

function initTracking() {
    var saved = localStorage.getItem('ecowash_last_booking');
    if (saved) {
        try {
            var data = JSON.parse(saved);
            showTracking(data);
        } catch (e) {}
    }
}

function initReviews() {
    var form = document.getElementById('review-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = {
            name: document.getElementById('rv-name').value.trim(),
            rating: document.getElementById('rv-rating').value,
            message: document.getElementById('rv-message').value.trim(),
            date: new Date().toISOString()
        };
        if (!data.name || !data.message) { alert('Veuillez remplir tous les champs.'); return; }
        saveLocal('ecowash_reviews', data);
        var container = document.getElementById('testimonials-list');
        var stars = '';
        for (var i = 0; i < parseInt(data.rating); i++) stars += '\u2605';
        var div = document.createElement('div');
        div.className = 'testimonial';
        div.innerHTML = '<div class="stars">' + stars + '</div><p>"' + escHtml(data.message) + '"</p><span class="author">- ' + escHtml(data.name) + '</span>';
        container.appendChild(div);
        form.reset();
        var msg = document.createElement('div');
        msg.className = 'form-message success';
        msg.textContent = 'Merci pour votre avis !';
        form.parentNode.appendChild(msg);
        setTimeout(function () { msg.remove(); }, 4000);
    });
    renderSavedReviews();
}

function renderSavedReviews() {
    var container = document.getElementById('testimonials-list');
    if (!container) return;
    var reviews = JSON.parse(localStorage.getItem('ecowash_reviews') || '[]');
    var defaults = [
        { name: 'Mamadou D.', rating: 5, message: 'Excellent produit ! Ma voiture brille comme au premier jour.' },
        { name: 'Fatou S.', rating: 5, message: 'Fini les longues files d\'attente. EcoWash vient à moi, rapide et efficace.' },
        { name: 'Ibrahim K.', rating: 5, message: 'Très satisfait du rapport qualité-prix. La peinture est comme neuve.' }
    ];
    var all = reviews.length > 0 ? reviews : defaults;
    var html = '';
    all.forEach(function (r) {
        var stars = '';
        for (var i = 0; i < parseInt(r.rating || 5); i++) stars += '\u2605';
        html += '<div class="testimonial fade-in"><div class="stars">' + stars + '</div><p>"' + escHtml(r.message) + '"</p><span class="author">- ' + escHtml(r.name) + '</span></div>';
    });
    container.innerHTML = html;
    setTimeout(initAnimations, 100);
}

function initContactForm() {
    var form = document.getElementById('contact-form');
    var success = document.getElementById('form-success');
    var error = document.getElementById('form-error');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            date: new Date().toISOString()
        };
        if (!data.name || !data.email || !data.message) { alert('Veuillez remplir tous les champs obligatoires.'); return; }
        saveLocal('ecowash_messages', data);
        if (C.email?.endpoint) sendForm(C.email.endpoint, data);
        form.reset();
        if (success) { success.classList.remove('hidden'); setTimeout(function () { success.classList.add('hidden'); }, 5000); }
        if (error) error.classList.add('hidden');
    });
}

function sendForm(endpoint, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Accept', 'application/json');
    var fd = new FormData();
    Object.keys(data).forEach(function (k) { fd.append(k, data[k]); });
    xhr.send(fd);
}

function initCart() {
    var btn = document.getElementById('cart-btn');
    var sidebar = document.getElementById('cart-sidebar');
    var overlay = document.getElementById('cart-overlay');
    var closeBtn = document.getElementById('cart-close');
    var checkoutBtn = document.getElementById('cart-checkout');

    if (btn && sidebar) {
        btn.addEventListener('click', function () {
            sidebar.classList.add('open');
            overlay.classList.add('open');
            Cart.renderCart();
        });
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', function () {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', function () {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            var items = Cart.get();
            if (items.length === 0) { alert('Votre panier est vide.'); return; }
            var msg = 'Commande EcoWash :\n';
            items.forEach(function (i) { msg += '- ' + i.name + ' × ' + i.qty + ' = ' + formatPrice(i.price * i.qty) + '\n'; });
            msg += 'Total : ' + formatPrice(Cart.getTotal());
            if (C.whatsapp) {
                window.open('https://wa.me/' + C.whatsapp.number + '?text=' + encodeURIComponent(msg), '_blank');
            }
            Cart.clear();
            Cart.renderCart();
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
}

function initChat() {
    var btn = document.getElementById('chat-btn');
    var window = document.getElementById('chat-window');
    var close = document.getElementById('chat-close');
    var input = document.getElementById('chat-input');
    var send = document.getElementById('chat-send');
    var body = document.getElementById('chat-body');

    if (btn && window) {
        btn.addEventListener('click', function () {
            window.classList.toggle('open');
        });
    }
    if (close && window) {
        close.addEventListener('click', function () {
            window.classList.remove('open');
        });
    }

    var responses = {
        'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
        'prix': 'Nos lavages commencent à 1 000 F (Express). Le Complet est à 2 500 F et le Premium à 4 000 F.',
        'tarif': 'Nos lavages commencent à 1 000 F (Express). Le Complet est à 2 500 F et le Premium à 4 000 F.',
        'rendez-vous': 'Vous pouvez réserver directement sur notre site dans la section Rendez-vous, ou nous contacter par WhatsApp.',
        'réservation': 'Vous pouvez réserver directement sur notre site dans la section Rendez-vous, ou nous contacter par WhatsApp.',
        'produit': 'Nous utilisons une formule concentrée sans eau, biodégradable, avec cire de carnauba pour la brillance.',
        'heure': 'Nous sommes ouverts du lundi au samedi de 08h00 à 18h00.',
        'ouverture': 'Nous sommes ouverts du lundi au samedi de 08h00 à 18h00.',
        'contact': 'Vous pouvez nous joindre au +225 XX XX XX XX ou par email à contact@ecowash.africa.',
        'merci': 'Merci à vous ! À bientôt chez EcoWash !'
    };

    function addMsg(text, cls) {
        var div = document.createElement('div');
        div.className = 'chat-msg ' + cls;
        div.textContent = text;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function sendMsg() {
        var text = input.value.trim();
        if (!text) return;
        addMsg(text, 'user');
        input.value = '';
        setTimeout(function () {
            var reply = 'Merci pour votre message. Un conseiller vous répondra bientôt. Sinon, contactez-nous directement sur WhatsApp.';
            var lower = text.toLowerCase();
            for (var key in responses) {
                if (lower.indexOf(key) !== -1) { reply = responses[key]; break; }
            }
            addMsg(reply, 'bot');
        }, 800);
    }

    if (send) send.addEventListener('click', sendMsg);
    if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendMsg(); });
}

function initInvoiceLink() {
    var link = document.getElementById('footer-invoice-link');
    if (!link) return;
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var booking = localStorage.getItem('ecowash_last_booking');
        if (!booking) { alert('Aucune réservation récente trouvée.'); return; }
        try {
            var data = JSON.parse(booking);
            generateInvoice(data);
        } catch (err) { alert('Erreur lors de la génération de la facture.'); }
    });
}

function generateInvoice(data) {
    var w = window.open('', '_blank');
    if (!w) { alert('Veuillez autoriser les popups.'); return; }
    var servicePrices = { simple: 1000, complet: 2500, premium: 4000 };
    var price = servicePrices[data.service] || 2500;
    w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Facture EcoWash</title>' +
        '<style>body{font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto}' +
        'h1{color:#2ecc71}table{width:100%;border-collapse:collapse;margin:20px 0}' +
        'th,td{padding:10px;text-align:left;border-bottom:1px solid #ddd}' +
        'th{background:#ecf0f1}.total{font-weight:700;font-size:1.2rem}' +
        '.footer{margin-top:30px;color:#95a5a6;font-size:.8rem;text-align:center}' +
        '@media print{body{padding:20px}}</style></head><body>' +
        '<h1>EcoWash</h1><p>Lavage auto sans eau</p><hr>' +
        '<h2>Facture #' + data.id + '</h2>' +
        '<p><strong>Client :</strong> ' + escHtml(data.name) + '<br><strong>Téléphone :</strong> ' + escHtml(data.phone) + '<br><strong>Adresse :</strong> ' + escHtml(data.address) + '</p>' +
        '<table><tr><th>Service</th><th>Date</th><th>Montant</th></tr>' +
        '<tr><td>' + data.service + '</td><td>' + data.date + ' à ' + data.time + '</td><td>' + formatPrice(price) + '</td></tr>' +
        '<tr class="total"><td colspan="2">Total</td><td>' + formatPrice(price) + '</td></tr></table>' +
        '<p><strong>Paiement :</strong> ' + data.payment + '</p>' +
        '<p><strong>Véhicule :</strong> ' + data.vehicle + '</p>' +
        (data.notes ? '<p><strong>Notes :</strong> ' + escHtml(data.notes) + '</p>' : '') +
        '<div class="footer">EcoWash - ' + C.business?.email + ' - ' + C.business?.phone + '</div>' +
        '<script>window.print();<' + '/script></body></html>');
    w.document.close();
}

function initNotifications() {
    if ('Notification' in window && C.notifications?.push) {
        var bar = document.getElementById('notif-bar');
        if (bar && Notification.permission === 'default') {
            bar.textContent = '🔔 Activez les notifications pour ne pas manquer vos rappels de rendez-vous';
            bar.classList.add('show');
            bar.addEventListener('click', function () {
                Notification.requestPermission().then(function (perm) {
                    bar.classList.remove('show');
                    if (perm === 'granted') {
                        new Notification('EcoWash', { body: 'Notifications activées ! Vous recevrez un rappel 24h avant chaque rendez-vous.', icon: 'images/icon-192.svg' });
                    }
                });
            });
        }
    }
}

function requestNotify() {
    if ('Notification' in window && Notification.permission === 'granted' && C.notifications?.push) {
        new Notification('EcoWash - Rendez-vous confirmé', {
            body: 'Votre rendez-vous a bien été enregistré. Nous vous enverrons un rappel.',
            icon: 'images/icon-192.svg'
        });
    }
}

function initFooter() {
    var email = document.getElementById('footer-email');
    var phone = document.getElementById('footer-phone');
    var hours = document.getElementById('footer-hours');
    var social = document.getElementById('footer-social');
    if (email && C.business?.email) email.textContent = 'Email : ' + C.business.email;
    if (phone && C.business?.phone) phone.textContent = 'Tél : ' + C.business.phone;
    if (hours && C.business?.hours) hours.textContent = 'Horaires : ' + C.business.hours;
    if (social && C.social) {
        var links = [];
        if (C.social.facebook) links.push('<a href="' + C.social.facebook + '" class="footer-link" target="_blank">Facebook</a>');
        if (C.social.instagram) links.push('<a href="' + C.social.instagram + '" class="footer-link" target="_blank">Instagram</a>');
        if (C.whatsapp) links.push('<a href="https://wa.me/' + C.whatsapp.number + '" class="footer-link" target="_blank">WhatsApp</a>');
        if (links.length) social.innerHTML = links.join(' | ');
    }
}

function saveLocal(key, data) {
    try {
        var items = JSON.parse(localStorage.getItem(key) || '[]');
        items.push(data);
        localStorage.setItem(key, JSON.stringify(items));
    } catch (e) {}
}

function escHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

function formatPrice(val) {
    return Number(val).toLocaleString('fr-FR') + ' F';
}

/* === COMPTEURS IMPACT === */
function initImpact() {
    var grid = document.getElementById('impact-grid');
    if (!grid) return;
    var bookings = JSON.parse(localStorage.getItem('ecowash_bookings') || '[]');
    var count = bookings.length;
    var impactData = [
        { icon: '\u{1F4A7}', num: 0, suffix: 'L', label: 'Eau économisée', target: count * 300 || 125000 },
        { icon: '\u{1F697}', num: 0, suffix: '', label: 'Véhicules lavés', target: count || 5280 },
        { icon: '\u{1F331}', num: 0, suffix: 'kg', label: 'CO\u2082 évité', target: Math.round(count * 3.5) || 18400 },
        { icon: '\u{1F4C8}', num: 0, suffix: '%', label: 'Clients satisfaits', target: 97 }
    ];
    var html = '';
    impactData.forEach(function (d, i) {
        html += '<div class="impact-item fade-in"><div class="impact-icon">' + d.icon + '</div>' +
            '<div class="impact-num"><span id="impact-val-' + i + '">0</span><span class="suffix">' + d.suffix + '</span></div>' +
            '<div class="impact-label">' + d.label + '</div></div>';
    });
    grid.innerHTML = html;

    impactData.forEach(function (d, i) {
        animateCounter('impact-val-' + i, d.target, 2000);
    });
}

function animateCounter(id, target, duration) {
    var el = document.getElementById(id);
    if (!el) return;
    var start = 0;
    var step = Math.ceil(target / (duration / 16));
    function tick() {
        start += step;
        if (start >= target) { el.textContent = target.toLocaleString('fr-FR'); return; }
        el.textContent = start.toLocaleString('fr-FR');
        requestAnimationFrame(tick);
    }
    tick();
}

/* === CARROUSEL AVIS === */
function initTestiCarousel() {
    var container = document.getElementById('testimonials-list');
    if (!container) return;
    var slides = container.querySelectorAll('.testimonial');
    if (slides.length < 2) return;

    container.className = 'testi-carousel';
    container.innerHTML = '';
    var dotsHtml = '<div class="testi-dots">';

    slides.forEach(function (s, i) {
        s.className = 'testi-slide' + (i === 0 ? ' active' : '');
        container.appendChild(s);
        dotsHtml += '<button class="testi-dot' + (i === 0 ? ' active' : '') + '" onclick="goToSlide(' + i + ')"></button>';
    });
    dotsHtml += '</div>';
    container.insertAdjacentHTML('beforeend', dotsHtml);

    var current = 0;
    setInterval(function () {
        goToSlide((current + 1) % slides.length);
    }, 5000);

    window.goToSlide = function (idx) {
        container.querySelectorAll('.testi-slide').forEach(function (s, i) {
            s.classList.toggle('active', i === idx);
        });
        container.querySelectorAll('.testi-dot').forEach(function (d, i) {
            d.classList.toggle('active', i === idx);
        });
        current = idx;
    };
}

/* === PARRAINAGE === */
function initReferral() {
    var codeInput = document.getElementById('referral-code');
    if (!codeInput) return;
    var stored = localStorage.getItem('ecowash_ref_code');
    if (!stored) {
        stored = 'EW' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2,4).toUpperCase();
        localStorage.setItem('ecowash_ref_code', stored);
    }
    codeInput.value = stored;
}

function shareReferral(method) {
    var code = document.getElementById('referral-code');
    if (!code) return;
    var msg = 'Rejoins EcoWash ! Utilise mon code parrainage "' + code.value + '" et reçois 500 F de réduction sur ton premier lavage. Télécharge : ' + window.location.href;

    if (method === 'whatsapp') {
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    } else if (method === 'copy') {
        copyReferral();
    } else if (method === 'sms') {
        window.open('sms:?body=' + encodeURIComponent(msg), '_blank');
    }
}

function copyReferral() {
    var input = document.getElementById('referral-code');
    if (!input) return;
    input.select();
    input.setSelectionRange(0, 99999);
    try { document.execCommand('copy'); alert('Code copié ! Partagez-le à vos amis.'); } catch (e) {}
}

/* === INSTALLATION PWA === */
function initPWAInstall() {
    var deferredPrompt = null;
    var installBar = document.getElementById('install-bar');
    var installBtn = document.getElementById('install-btn');

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPrompt = e;
        if (installBar) installBar.classList.add('show');
    });

    if (installBtn) {
        installBtn.addEventListener('click', function () {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function () {
                deferredPrompt = null;
                if (installBar) installBar.classList.remove('show');
            });
        });
    }

    if ('getInstalledRelatedApps' in navigator) {
        navigator.getInstalledRelatedApps().then(function (apps) {
            if (apps.length > 0 && installBar) installBar.classList.remove('show');
        });
    }

    window.addEventListener('appinstalled', function () {
        if (installBar) installBar.classList.remove('show');
    });
}

function dismissInstall() {
    var bar = document.getElementById('install-bar');
    if (bar) bar.classList.remove('show');
    localStorage.setItem('ecowash_dismiss_install', '1');
}

/* === AJOUT AU PANIER (produits.html) === */
function initCatalogCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var product = {
                id: btn.getAttribute('data-id'),
                name: btn.getAttribute('data-name'),
                price: parseInt(btn.getAttribute('data-price'))
            };
            Cart.add(product);
        });
    });
}

/* === BLOG === */
function initBlog() {
    var grid = document.getElementById('blog-grid');
    if (!grid) return;
    var posts = [
        { tag: 'Astuce', title: 'Comment éviter les rayures au lavage ?', desc: 'Utilisez toujours deux microfibres : une pour nettoyer, une pour sécher. Le mouvement droit est essentiel.', icon: '\u{1F6A8}', color: '#e74c3c' },
        { tag: 'Conseil', title: 'Protégez votre peinture du soleil africain', desc: 'Le soleil décolore la peinture. Notre cire de carnauba anti-UV nourrit et protège votre carrosserie.', icon: '\u2600\uFE0F', color: '#f39c12' },
        { tag: 'Éco', title: 'Économisez 300L d\'eau à chaque lavage', desc: 'Un lavage traditionnel utilise 150-300L. EcoWash : 0L. En 1 an, c\'est assez d\'eau pour une famille.', icon: '\u{1F30D}', color: '#2ecc71' },
        { tag: 'Produit', title: 'Notre formule concentré 1:200 expliquée', desc: '1L de concentré = 200L de produit prêt = 500 lavages. Soit moins de 5 FCFA par véhicule !', icon: '\u{1F9EA}', color: '#3498db' },
        { tag: 'Moto', title: 'Lavage moto sans eau : 500 F, 7 min', desc: 'Notre forfait moto est rapide et économique. Parfait pour les taxis-motos et scooters.', icon: '\u{1F3CD}\uFE0F', color: '#9b59b6' },
        { tag: 'Abonnement', title: 'Économisez 30% avec un abonnement', desc: 'Forfait Régulier : 2 lavages/mois à 12 000 F au lieu de 15 000 F. Économisez 3 000 F !', icon: '\u{1F4B0}', color: '#27ae60' }
    ];
    var html = '';
    posts.forEach(function (p) {
        html += '<div class="blog-card fade-in"><div class="blog-img" style="background:' + p.color + '20;color:' + p.color + '">' + p.icon + '</div>' +
            '<div class="blog-body"><span class="tag">' + p.tag + '</span><h3>' + p.title + '</h3><p>' + p.desc + '</p></div></div>';
    });
    grid.innerHTML = html;
}

/* === FIDÉLITÉ === */
function initLoyalty() {
    var pointsEl = document.getElementById('loyalty-points');
    var barEl = document.getElementById('loyalty-bar-fill');
    var nextEl = document.getElementById('loyalty-next');
    var rewardsEl = document.getElementById('loyalty-rewards');
    if (!pointsEl) return;

    var bookings = JSON.parse(localStorage.getItem('ecowash_bookings') || '[]');
    var points = bookings.length * 50;
    try { points += parseInt(localStorage.getItem('ecowash_extra_points') || '0'); } catch(e) {}

    var rewards = [
        { pts: 100, label: 'Lavage gratuit', icon: '\u{1F3C6}' },
        { pts: 250, label: 'Cirage offert', icon: '\u2728' },
        { pts: 500, label: 'Lavage Premium', icon: '\u{1F31F}' },
        { pts: 1000, label: 'Céramique -50%', icon: '\u{1F48E}' }
    ];

    pointsEl.textContent = points;
    var next = 100;
    for (var i = 0; i < rewards.length; i++) {
        if (points < rewards[i].pts) { next = rewards[i].pts; break; }
    }
    if (nextEl) nextEl.textContent = 'Prochain palier : ' + next + ' pts (' + (next - points) + ' pts restants)';

    var pct = Math.min(100, (points / next) * 100);
    if (barEl) barEl.style.width = pct + '%';

    if (rewardsEl) {
        var html = '';
        rewards.forEach(function (r) {
            var unlocked = points >= r.pts;
            html += '<div class="loyalty-reward' + (unlocked ? ' unlocked' : '') + '">' +
                '<div class="r-points">' + r.icon + ' ' + r.pts + '</div>' +
                '<div class="r-label">' + r.label + '</div></div>';
        });
        rewardsEl.innerHTML = html;
    }
}

/* === CODES PROMO === */
function initPromo() {
    var input = document.getElementById('bk-promo');
    var msg = document.getElementById('promo-msg');
    if (!input) return;

    var promos = JSON.parse(localStorage.getItem('ecowash_promos') || '[]');
    if (promos.length === 0) {
        promos = [
            { code: 'WELCOME10', type: 'percent', value: 10, label: '-10%' },
            { code: 'ECO20', type: 'percent', value: 20, label: '-20%' },
            { code: 'FIDELITE', type: 'fixed', value: 500, label: '-500 F' }
        ];
        localStorage.setItem('ecowash_promos', JSON.stringify(promos));
    }

    input.addEventListener('input', function () {
        var code = input.value.trim().toUpperCase();
        var found = promos.find(function (p) { return p.code === code; });
        if (code.length < 3) { msg.textContent = ''; msg.className = 'promo-msg'; return; }
        if (found) {
            msg.textContent = 'Code valide ! ' + found.label;
            msg.className = 'promo-msg valid';
            input.setAttribute('data-valid', 'true');
            input.setAttribute('data-discount', found.type === 'percent' ? found.value : found.value);
            input.setAttribute('data-discount-type', found.type);
        } else {
            msg.textContent = 'Code invalide';
            msg.className = 'promo-msg invalid';
            input.setAttribute('data-valid', 'false');
        }
    });
}

/* === COOKIES === */
function initCookies() {
    var bar = document.getElementById('cookie-bar');
    if (!bar) return;
    if (localStorage.getItem('ecowash_cookies') === 'accepted') return;
    bar.classList.add('show');
}

function acceptCookies() {
    var bar = document.getElementById('cookie-bar');
    if (bar) bar.classList.remove('show');
    localStorage.setItem('ecowash_cookies', 'accepted');
}

/* === PARTAGE APP === */
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'EcoWash - Lavage Sans Eau',
            text: 'Découvrez EcoWash : lavage auto sans eau, écologique et économique en Afrique !',
            url: window.location.href
        }).catch(function () {});
    } else {
        var input = document.createElement('input');
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        try { document.execCommand('copy'); alert('Lien copié ! Partagez-le à vos amis.'); } catch(e) {}
        document.body.removeChild(input);
    }
}

/* === AUTO-SAVE FORMULAIRE === */
function initAutoSave() {
    var form = document.getElementById('booking-form');
    if (!form) return;
    var saved = localStorage.getItem('ecowash_booking_draft');
    if (saved) {
        try {
            var data = JSON.parse(saved);
            ['bk-name','bk-phone','bk-address','bk-vehicle','bk-service','bk-date','bk-time','bk-payment','bk-notes','bk-promo'].forEach(function (id) {
                var el = document.getElementById(id);
                if (el && data[id]) {
                    if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') el.value = data[id];
                    else if (el.tagName === 'SELECT') el.value = data[id];
                }
            });
        } catch(e) {}
    }
    form.addEventListener('input', function () {
        var data = {};
        ['bk-name','bk-phone','bk-address','bk-vehicle','bk-service','bk-date','bk-time','bk-payment','bk-notes','bk-promo'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) data[id] = el.value;
        });
        localStorage.setItem('ecowash_booking_draft', JSON.stringify(data));
    });
    form.addEventListener('submit', function () {
        localStorage.removeItem('ecowash_booking_draft');
    });
}

/* === SW MISE À JOUR === */
function initSWUpdate() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
        showUpdateBar();
    });
    navigator.serviceWorker.addEventListener('message', function (e) {
        if (e.data && e.data.type === 'SW_UPDATED') showUpdateBar();
    });
}

function showUpdateBar() {
    var bar = document.getElementById('notif-bar');
    if (bar) {
        bar.textContent = '🔁 Nouvelle version disponible. Cliquez pour mettre à jour.';
        bar.classList.add('show');
        bar.style.cursor = 'pointer';
        bar.onclick = function () { location.reload(); };
    }
}

/* === RAPPEL RENDEZ-VOUS VIA SW === */
function scheduleBookingReminder(data) {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;
    navigator.serviceWorker.ready.then(function (reg) {
        reg.showNotification('EcoWash - Rendez-vous confirmé', {
            body: data.name + ', votre rendez-vous ' + data.service + ' est confirmé pour le ' + data.date + ' à ' + data.time + '.',
            icon: 'images/icon-192.svg',
            tag: 'booking-' + data.id,
            requireInteraction: true
        });
        reg.active.postMessage({
            type: 'SCHEDULE_NOTIFICATION',
            payload: { id: data.id, name: data.name, service: data.service, date: data.date, time: data.time }
        });
    });
}

/* === ADMIN SOND === */
function initAdminSound() {
    var lastCount = parseInt(localStorage.getItem('ecowash_last_msg_count') || '0');
    setInterval(function () {
        var msgs = JSON.parse(localStorage.getItem('ecowash_messages') || '[]');
        if (msgs.length > lastCount) {
            lastCount = msgs.length;
            localStorage.setItem('ecowash_last_msg_count', String(lastCount));
            try {
                var ctx = new (window.AudioContext || window.webkitAudioContext)();
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = 800;
                gain.gain.value = 0.1;
                osc.start();
                osc.stop(ctx.currentTime + 0.15);
            } catch(e) {}
        }
    }, 10000);
}

/* === mettre à jour DOMContentLoaded === */
document.addEventListener('DOMContentLoaded', function () {
    initAutoSave();
    initSWUpdate();
    initAdminSound();
    initBookingAvailability();
    initPriceCalculator();
    initProductSearch();
    scheduleServiceReminder();
});

/* === ESPACE CLIENT === */
function openClientDashboard() {
    var modal = document.getElementById('client-modal');
    if (!modal) return;
    modal.classList.add('show');
    var phone = localStorage.getItem('ecowash_client_phone');
    if (phone) {
        document.getElementById('client-login').classList.add('hidden');
        document.getElementById('client-dashboard').classList.remove('hidden');
        renderClientDashboard(phone);
    } else {
        document.getElementById('client-login').classList.remove('hidden');
        document.getElementById('client-dashboard').classList.add('hidden');
    }
}

function closeClientDashboard(e) {
    if (e && e.target !== e.currentTarget) return;
    var modal = document.getElementById('client-modal');
    if (modal) modal.classList.remove('show');
}

function clientLogin() {
    var phone = document.getElementById('client-phone').value.trim();
    if (!phone || phone.length < 6) {
        document.getElementById('client-login-error').textContent = 'Entrez un numéro valide.';
        document.getElementById('client-login-error').classList.remove('hidden');
        return;
    }
    localStorage.setItem('ecowash_client_phone', phone);
    document.getElementById('client-login').classList.add('hidden');
    document.getElementById('client-dashboard').classList.remove('hidden');
    renderClientDashboard(phone);
}

function clientLogout() {
    localStorage.removeItem('ecowash_client_phone');
    document.getElementById('client-dashboard').classList.add('hidden');
    document.getElementById('client-login').classList.remove('hidden');
    document.getElementById('client-phone').value = '';
}

function renderClientDashboard(phone) {
    var bookings = JSON.parse(localStorage.getItem('ecowash_bookings') || '[]');
    var myBookings = bookings.filter(function (b) { return b.phone === phone; });
    var points = myBookings.length * 50;
    try { points += parseInt(localStorage.getItem('ecowash_extra_points') || '0'); } catch(e) {}

    document.getElementById('client-stats').innerHTML =
        '<div class="stat-card"><div class="num">' + myBookings.length + '</div><div class="label">Lavages</div></div>' +
        '<div class="stat-card"><div class="num">' + points + '</div><div class="label">Points</div></div>' +
        '<div class="stat-card"><div class="num">' + getBadges(myBookings.length).length + '</div><div class="label">Badges</div></div>';

    var badges = getBadges(myBookings.length);
    var badgesHtml = '';
    badges.forEach(function (b) {
        badgesHtml += '<div style="text-align:center;min-width:70px"><div style="font-size:2rem">' + b.icon + '</div><div style="font-size:.7rem;color:var(--gray)">' + b.label + '</div></div>';
    });
    if (!badges.length) badgesHtml = '<div style="color:var(--gray);font-size:.85rem">Pas encore de badges. Réservez vos premiers lavages !</div>';
    document.getElementById('client-badges').innerHTML = badgesHtml;

    var hist = document.getElementById('client-history');
    if (!myBookings.length) {
        hist.innerHTML = '<div class="empty-msg">Aucun lavage effectué pour le moment.</div>';
        return;
    }
    var html = '';
    for (var i = myBookings.length - 1; i >= 0; i--) {
        var b = myBookings[i];
        var svcNames = { simple: 'Simple', complet: 'Complet', premium: 'Premium' };
        html += '<div class="msg-card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">' +
            '<div><strong>' + b.date + ' à ' + b.time + '</strong><br><span style="font-size:.85rem;color:var(--gray)">' +
            (svcNames[b.service] || b.service) + ' - ' + b.vehicle + '</span></div>' +
            '<span class="bk-status ' + (b.status || 'confirmed') + '">' + (b.status || 'Confirmé') + '</span></div>';
    }
    hist.innerHTML = html;
}

function getBadges(numBookings) {
    var badges = [];
    var allBadges = [
        { min: 1, icon: '🧽', label: 'Premier lavage' },
        { min: 3, icon: '🌟', label: 'Régulier' },
        { min: 5, icon: '🏆', label: 'Expert' },
        { min: 10, icon: '👑', label: 'VIP' },
        { min: 25, icon: '💎', label: 'Légende' }
    ];
    allBadges.forEach(function (b) {
        if (numBookings >= b.min) badges.push(b);
    });
    var referralCount = parseInt(localStorage.getItem('ecowash_referral_count') || '0');
    if (referralCount >= 1) badges.push({ icon: '🤝', label: 'Parrain' });
    if (referralCount >= 3) badges.push({ icon: '📣', label: 'Ambassadeur' });
    return badges;
}

function viewInvoices() {
    var phone = localStorage.getItem('ecowash_client_phone');
    if (!phone) { alert('Connectez-vous d\'abord.'); return; }
    var bookings = JSON.parse(localStorage.getItem('ecowash_bookings') || '[]');
    var myBookings = bookings.filter(function (b) { return b.phone === phone; });
    if (!myBookings.length) { alert('Aucune facture disponible.'); return; }
    var data = myBookings[myBookings.length - 1];
    generateInvoice(data);
}

/* === DISPONIBILITÉ CRÉNEAUX === */
function initBookingAvailability() {
    var dateInput = document.getElementById('bk-date');
    var timeSelect = document.getElementById('bk-time');
    if (!dateInput || !timeSelect) return;

    function updateSlots() {
        var date = dateInput.value;
        if (!date) return;
        var bookings = JSON.parse(localStorage.getItem('ecowash_bookings') || '[]');
        var dayBks = bookings.filter(function (b) { return b.date === date; });
        var takenSlots = {};
        dayBks.forEach(function (b) { takenSlots[b.time] = true; });
        var options = timeSelect.querySelectorAll('option');
        options.forEach(function (opt) {
            if (opt.value && takenSlots[opt.value]) {
                opt.disabled = true;
                opt.textContent = opt.value + ' ❌';
            } else if (opt.value) {
                opt.disabled = false;
                opt.textContent = opt.value;
            }
        });
    }

    dateInput.addEventListener('change', updateSlots);
    updateSlots();
}

/* === CALCULATEUR DE PRIX === */
function initPriceCalculator() {
    var vehicle = document.getElementById('bk-vehicle');
    var service = document.getElementById('bk-service');
    var display = document.getElementById('bk-price-display');
    if (!vehicle || !service) return;

    if (!display) {
        display = document.createElement('div');
        display.id = 'bk-price-display';
        display.style.cssText = 'margin-top:10px;font-size:1.1rem;font-weight:600;color:var(--primary-dark);text-align:center';
        service.parentElement.appendChild(display);
    }

    function updatePrice() {
        var v = vehicle.value;
        var s = service.value;
        var prices = { simple: { voiture: 1000, utilitaire: 1500, moto: 500 }, complet: { voiture: 2000, utilitaire: 3000, moto: 1000 }, premium: { voiture: 3500, utilitaire: 5000, moto: 2000 } };
        if (prices[s] && prices[s][v]) {
            display.textContent = '💰 Estimation : ' + formatPrice(prices[s][v]);
        } else {
            display.textContent = '';
        }
    }

    vehicle.addEventListener('change', updatePrice);
    service.addEventListener('change', updatePrice);
    updatePrice();
}

/* === RAPPEL SERVICE (2 SEMAINES) === */
function scheduleServiceReminder() {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    var bookings = JSON.parse(localStorage.getItem('ecowash_bookings') || '[]');
    if (!bookings.length) return;
    var last = bookings[bookings.length - 1];
    var lastDate = new Date(last.date + 'T' + (last.time || '12:00'));
    var twoWeeks = 14 * 24 * 60 * 60 * 1000;
    var elapsed = Date.now() - lastDate.getTime();
    var reminded = localStorage.getItem('ecowash_reminded_2w');
    if (elapsed >= twoWeeks && reminded !== last.date) {
        setTimeout(function () {
            if (Notification.permission === 'granted') {
                new Notification('EcoWash - Ça fait 2 semaines !', {
                    body: 'Votre dernier lavage remonte au ' + last.date + '. Envie d\'une nouvelle session ?',
                    icon: 'images/icon-192.svg'
                });
                localStorage.setItem('ecowash_reminded_2w', last.date);
            }
        }, 5000);
    }
}

/* === RECHERCHE PRODUITS === */
function initProductSearch() {
    var input = document.getElementById('product-search');
    if (!input) return;
    input.addEventListener('input', function () {
        var q = input.value.toLowerCase().trim();
        var cards = document.querySelectorAll('.product-card, .product-item');
        cards.forEach(function (card) {
            var text = card.textContent.toLowerCase();
            card.style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
        });
    });
}

/* === COMMENT ÇA MARCHE === */
function initSteps() {
    var grid = document.getElementById('steps-grid');
    if (!grid) return;
    var steps = [
        { num: 1, icon: '\u{1F4F1}', title: 'Vous réservez', desc: 'Choisissez votre date, heure et type de lavage en 30 secondes.' },
        { num: 2, icon: '\u{1F697}', title: 'Nous venons à vous', desc: 'Un technicien EcoWash arrive avec tout le matériel nécessaire.' },
        { num: 3, icon: '\u2728', title: 'Votre véhicule brille', desc: 'Lavage complet sans eau, sans traces, en 10 à 20 minutes.' }
    ];
    var html = '';
    steps.forEach(function (s) {
        html += '<div class="step-card fade-in"><div class="step-num">' + s.num + '</div>' +
            '<div class="step-icon">' + s.icon + '</div><h3>' + s.title + '</h3><p>' + s.desc + '</p></div>';
    });
    grid.innerHTML = html;
}

/* === GARANTIE / CONFIANCE === */
function initTrust() {
    var grid = document.getElementById('trust-grid');
    if (!grid) return;
    var items = [
        { icon: '\u{1F4B0}', title: 'Économique', desc: 'Jusqu\'à 70% d\'économie par rapport à un lavage traditionnel.' },
        { icon: '\u{1F504}', title: '100% Satisfaction', desc: 'Satisfait ou remboursé. Notre engagement qualité.' },
        { icon: '\u{1F30D}', title: 'Écologique', desc: '0 L d\'eau, zéro produit chimique agressif, biodégradable.' },
        { icon: '\u{23F0}', title: 'Rapide', desc: '10 min chrono pour une voiture. Vous ne perdez pas votre après-midi.' }
    ];
    var html = '';
    items.forEach(function (item) {
        html += '<div class="trust-card fade-in"><div class="trust-icon">' + item.icon + '</div>' +
            '<h3>' + item.title + '</h3><p>' + item.desc + '</p></div>';
    });
    grid.innerHTML = html;
}

/* === CALCULATEUR ÉCONOMIES === */
function initSavingsCalc() {
    var el = document.getElementById('savings-calc');
    if (!el) return;
    var bookings = JSON.parse(localStorage.getItem('ecowash_bookings') || '[]');
    var count = bookings.length;
    var freq = 24;
    var ecoYear = 1000 * freq;
    var stationYear = 3000 * freq;
    var informelYear = 1500 * freq;
    var saved = stationYear - ecoYear;
    var yourSavings = count > 3 ? (stationYear - ecoYear) * (count / 12) : 48000;

    el.innerHTML =
        '<table class="savings-table"><thead><tr><th>Méthode</th><th>Coût / lavage</th><th>Coût / mois (2x)</th><th>Coût / an</th></tr></thead><tbody>' +
        '<tr class="eco-row"><td>🧼 EcoWash</td><td>1 000 F</td><td>2 000 F</td><td><strong>24 000 F</strong></td></tr>' +
        '<tr><td>🏗️ Station auto</td><td>3 000 F</td><td>6 000 F</td><td>72 000 F</td></tr>' +
        '<tr><td>🧑‍🔧 Laveur informel</td><td>1 500 F</td><td>3 000 F</td><td>36 000 F</td></tr>' +
        '</tbody></table>' +
        '<div class="savings-total">💰 Économisez jusqu\'à <span style="font-size:1.5rem">' +
        formatPrice(Math.max(saved, yourSavings)) + '</span> par an avec EcoWash</div>';
}

/* === URGENCE TIMER === */
function initUrgenceTimer() {
    var hero = document.querySelector('.hero .container');
    if (!hero) return;
    var div = document.createElement('div');
    div.className = 'urgence-timer fade-in';
    var end = localStorage.getItem('ecowash_promo_end');
    if (!end) {
        var d = new Date();
        d.setDate(d.getDate() + 7);
        end = d.toISOString();
        localStorage.setItem('ecowash_promo_end', end);
    }
    div.innerHTML = '\u23F3 Offre valable encore : <span class="timer-num" id="timer-countdown"></span>';
    hero.appendChild(div);

    function updateTimer() {
        var el = document.getElementById('timer-countdown');
        if (!el) return;
        var now = Date.now();
        var target = new Date(end).getTime();
        var diff = Math.max(0, target - now);
        var days = Math.floor(diff / 86400000);
        var hours = Math.floor((diff % 86400000) / 3600000);
        if (days > 0) {
            el.textContent = days + 'j ' + hours + 'h';
        } else {
            var mins = Math.floor((diff % 3600000) / 60000);
            var secs = Math.floor((diff % 60000) / 1000);
            el.textContent = hours + 'h ' + mins + 'm ' + secs + 's';
        }
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

/* === SOCIAL PROOF === */
function initSocialProof() {
    var el = document.getElementById('social-proof');
    if (!el) return;
    var bookings = JSON.parse(localStorage.getItem('ecowash_bookings') || '[]');
    var count = bookings.length || 0;
    var items = [
        { num: count > 0 ? count : 0, suffix: '+', label: 'Lavages réalisés' },
        { num: Math.max(97, 100 - count), suffix: '%', label: 'Clients satisfaits' },
        { num: count > 0 ? Math.round(count * 300) : 0, suffix: 'L', label: 'Eau économisée' },
        { num: 4.8, suffix: '/5', label: 'Note moyenne' }
    ];
    if (count > 0) {
        items[0] = { num: count, suffix: '+', label: 'Lavages réalisés' };
        items[2] = { num: count * 300, suffix: 'L', label: 'Eau économisée' };
    }
    var html = '';
    items.forEach(function (item) {
        html += '<div class="social-proof-item"><div class="social-proof-num">' + item.num + item.suffix + '</div>' +
            '<div class="social-proof-label">' + item.label + '</div></div>';
    });
    el.innerHTML = html;
}

/* === PRICING CARDS === */
function initPricing() {
    var grid = document.getElementById('pricing-grid');
    if (!grid) return;
    var plans = [
        { icon: '\u{1F9F9}', name: 'Express', price: '1 000 F', period: '/lavage', desc: 'Lavage rapide pour véhicule propre', features: ['Lavage extérieur complet', 'Microfibres premium', '10 min chrono', 'Sans eau'], featured: false },
        { icon: '\u{2728}', name: 'Complet', price: '2 000 F', period: '/lavage', desc: 'Le plus populaire — tout compris', features: ['Lavage extérieur + intérieur', 'Aspiration sièges & tapis', 'Cire protectrice anti-UV', 'Nettoie vitres & rétros', 'Désinfectant volant'], featured: true },
        { icon: '\u{1F48E}', name: 'Premium', price: '3 500 F', period: '/lavage', desc: 'Traitement complet haut de gamme', features: ['Tout le lavage Complet', 'Polissage carrosserie', 'Cire céramique longue durée', 'Protection pneus & plastiques', 'Désinfection complète habitacle'], featured: false }
    ];
    var html = '';
    plans.forEach(function (p) {
        html += '<div class="pricing-card fade-in' + (p.featured ? ' featured' : '') + '">' +
            (p.featured ? '<div class="pricing-badge">Populaire</div>' : '') +
            '<div class="pricing-icon">' + p.icon + '</div>' +
            '<h3>' + p.name + '</h3>' +
            '<div class="pricing-price">' + p.price + ' <small>' + p.period + '</small></div>' +
            '<div class="pricing-desc">' + p.desc + '</div>' +
            '<ul class="pricing-features">' + p.features.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
            '<a href="#rendezvous" class="btn">Choisir</a></div>';
    });
    grid.innerHTML = html;
}

/* === COMPARATEUR AVANT/APRÈS === */
function initCompareSlider() {
    var range = document.getElementById('slider-range');
    var before = document.getElementById('slider-before');
    var after = document.getElementById('slider-after');
    var handle = document.getElementById('slider-handle');
    if (!range || !before || !after) return;

    function updateSlider(val) {
        before.style.clipPath = 'inset(0 ' + (100 - val) + '% 0 0)';
        after.style.clipPath = 'inset(0 0 0 ' + val + '%)';
        if (handle) handle.style.left = val + '%';
    }

    range.addEventListener('input', function () { updateSlider(this.value); });

    var container = range.closest('.compare-slider');
    if (container) {
        container.addEventListener('mousemove', function (e) {
            var rect = container.querySelector('.slider-container').getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            if (x >= 0 && x <= 100) { range.value = x; updateSlider(x); }
        });
    }

    updateSlider(range.value);
}

/* === VIDÉO DÉMO === */
function initVideoDemo() {
    var placeholder = document.getElementById('video-placeholder');
    if (!placeholder) return;
    placeholder.addEventListener('click', function () {
        var userLink = localStorage.getItem('ecowash_youtube_link');
        var videoId = 'dQw4w9WgXcQ';
        if (userLink) {
            var match = userLink.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
            if (match) videoId = match[1];
        }
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
        iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none';
        this.innerHTML = '';
        this.appendChild(iframe);
        this.style.padding = '0';
        this.style.background = '#000';
    });
}

/* === BACK TO TOP === */
function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
        btn.classList.toggle('show', window.scrollY > 500);
    });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* === VALIDATION FORMULAIRE TEMPS RÉEL === */
function initFormValidation() {
    var form = document.getElementById('booking-form');
    if (!form) return;
    var fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (el) {
        el.addEventListener('blur', function () { validateField(el); });
        el.addEventListener('input', function () {
            if (el.value.trim()) validateField(el);
            else el.closest('.form-group')?.classList.remove('valid', 'invalid');
        });
    });
    form.addEventListener('submit', function () {
        fields.forEach(function (el) { validateField(el); });
    });
}

function validateField(el) {
    var group = el.closest('.form-group');
    if (!group) return;
    var valid = true;
    if (el.hasAttribute('required') && !el.value.trim()) valid = false;
    if (el.type === 'tel' && el.value.trim() && el.value.trim().length < 6) valid = false;
    if (el.type === 'email' && el.value.trim() && el.value.indexOf('@') === -1) valid = false;
    group.classList.toggle('valid', valid && el.value.trim().length > 0);
    group.classList.toggle('invalid', !valid && el.value.trim().length > 0);
}

/* === EXIT POPUP === */
function initExitPopup() {
    var shown = localStorage.getItem('ecowash_exit_shown');
    if (shown) return;
    document.addEventListener('mouseleave', function (e) {
        if (e.clientY > 0) return;
        var popup = document.getElementById('exit-popup');
        if (popup) {
            popup.classList.add('show');
            localStorage.setItem('ecowash_exit_shown', '1');
        }
    });
}

function closeExitPopup() {
    var popup = document.getElementById('exit-popup');
    if (popup) popup.classList.remove('show');
}

/* === LIGHTBOX GALERIE === */
function initLightbox() {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'lightbox-overlay';
    overlay.innerHTML = '<button class="lightbox-close" onclick="this.parentElement.classList.remove(\'show\')">&times;</button><img id="lightbox-img" src="" alt="">';
    document.body.appendChild(overlay);
    document.querySelectorAll('.gallery-item').forEach(function (item) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function () {
            var bg = this.style.backgroundImage || this.querySelector('img')?.src;
            var imgSrc = bg ? bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') : '';
            var img = document.getElementById('lightbox-img');
            if (img && imgSrc) {
                img.src = imgSrc;
                overlay.classList.add('show');
            }
        });
    });
}

/* === GÉOLOCALISATION === */
function initGeoZone() {
    var zoneSelect = document.getElementById('bk-address');
    if (!zoneSelect || !('geolocation' in navigator)) return;
    var zoneBtn = document.createElement('button');
    zoneBtn.type = 'button';
    zoneBtn.textContent = '📍 Me localiser';
    zoneBtn.className = 'btn btn-outline';
    zoneBtn.style.cssText = 'margin-top:8px;font-size:.85rem;padding:8px 16px';
    zoneBtn.addEventListener('click', function () {
        zoneBtn.textContent = '🔄 Recherche...';
        zoneBtn.disabled = true;
        navigator.geolocation.getCurrentPosition(
            function () {
                if (window.C?.business?.areas) {
                    var zones = window.C.business.areas;
                    zoneSelect.value = zones[0] || '';
                    zoneBtn.textContent = '✅ ' + zones[0];
                    setTimeout(function () { zoneBtn.textContent = '📍 Me localiser'; zoneBtn.disabled = false; }, 2000);
                }
            },
            function () {
                zoneBtn.textContent = '❌ Non disponible';
                zoneBtn.disabled = false;
                setTimeout(function () { zoneBtn.textContent = '📍 Me localiser'; }, 2000);
            }
        );
    });
    zoneSelect.parentElement.appendChild(zoneBtn);
}

/* === INDICATEUR HORS-LIGNE === */
function initOfflineIndicator() {
    var bar = document.createElement('div');
    bar.className = 'offline-bar';
    bar.id = 'offline-bar';
    bar.textContent = '📡 Vous êtes hors-ligne. Certaines fonctionnalités peuvent être limitées.';
    document.body.prepend(bar);

    function updateOnlineStatus() {
        var b = document.getElementById('offline-bar');
        if (b) b.classList.toggle('show', !navigator.onLine);
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
}

/* === MULTI-STEP BOOKING === */
var currentStep = 1;
var totalSteps = 4;

function nextStep(n) {
    if (n === 1) { if (!validateStep1()) return; }
    if (n === 2) { if (!validateStep2()) return; }
    if (n === 3) { if (!validateStep3()) return; }
    currentStep = n + 1;
    showStep(currentStep);
    if (currentStep === totalSteps) updateStepSummary();
}

function prevStep(n) {
    currentStep = n - 1;
    showStep(currentStep);
}

function showStep(n) {
    document.querySelectorAll('.booking-step').forEach(function (el) { el.classList.remove('active'); });
    document.querySelectorAll('.step-dot').forEach(function (el) { el.classList.remove('active', 'done'); });
    for (var i = 1; i <= totalSteps; i++) {
        var dot = document.querySelector('.step-dot[data-step="' + i + '"]');
        if (dot) {
            if (i === n) dot.classList.add('active');
            else if (i < n) dot.classList.add('done');
        }
    }
    var stepEl = document.querySelector('.booking-step[data-step="' + n + '"]');
    if (stepEl) stepEl.classList.add('active');
}

function validateStep1() {
    var v = document.getElementById('bk-vehicle');
    if (v && v.value) return true;
    showToast('Veuillez choisir un type de véhicule', 'error');
    return false;
}

function validateStep2() {
    var d = document.getElementById('bk-date');
    var t = document.getElementById('bk-time');
    if (d && d.value && t && t.value) return true;
    showToast('Veuillez choisir une date et un créneau', 'error');
    return false;
}

function validateStep3() {
    var a = document.getElementById('bk-address');
    var s = document.getElementById('bk-service');
    if (a && a.value.trim() && s && s.value) return true;
    showToast('Veuillez remplir l\'adresse et le service', 'error');
    return false;
}

function updateStepSummary() {
    var el = document.getElementById('step-summary');
    if (!el) return;
    var vehicle = document.getElementById('bk-vehicle');
    var service = document.getElementById('bk-service');
    var date = document.getElementById('bk-date');
    var time = document.getElementById('bk-time');
    var address = document.getElementById('bk-address');
    var payment = document.getElementById('bk-payment');
    var svcNames = { simple: 'Simple 1 000 F', complet: 'Complet 2 500 F', premium: 'Premium 4 000 F' };
    var vNames = { citadine: 'Citadine', berline: 'Berline', suv: '4x4/SUV', utilitaire: 'Utilitaire' };
    el.innerHTML =
        '<strong>Récapitulatif</strong><br><br>' +
        '🚗 ' + (vNames[vehicle?.value] || '—') + '<br>' +
        '📅 ' + (date?.value || '—') + ' à ' + (time?.value || '—') + '<br>' +
        '📍 ' + (address?.value || '—') + '<br>' +
        '🧼 ' + (svcNames[service?.value] || '—') + '<br>' +
        '💳 ' + (payment?.value || '—');
}

/* === TOAST NOTIFICATIONS === */
function showToast(msg, type) {
    type = type || 'info';
    var container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position:fixed;top:80px;right:15px;z-index:9999;display:flex;flex-direction:column;gap:8px';
        document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.style.cssText = 'padding:12px 20px;border-radius:8px;color:white;font-size:.9rem;font-weight:500;box-shadow:0 4px 15px rgba(0,0,0,.15);animation:slideIn .3s ease;max-width:350px';
    if (type === 'error') toast.style.background = '#e74c3c';
    else if (type === 'success') toast.style.background = '#2ecc71';
    else toast.style.background = '#3498db';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity .3s';
        setTimeout(function () { toast.remove(); }, 300);
    }, 3500);
}

/* === PROFILS VÉHICULES === */
function initVehicleProfiles() {
    var vehicleSelect = document.getElementById('bk-vehicle');
    if (!vehicleSelect) return;
    var profiles = JSON.parse(localStorage.getItem('ecowash_vehicles') || '[]');
    if (!profiles.length) return;
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-bottom:10px';
    var label = document.createElement('label');
    label.textContent = 'Véhicule enregistré';
    var select = document.createElement('select');
    select.id = 'bk-saved-vehicle';
    select.innerHTML = '<option value="">— Choisir un véhicule —</option>';
    profiles.forEach(function (p, i) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.textContent = p.name + ' (' + p.type + ')';
        select.appendChild(opt);
    });
    select.addEventListener('change', function () {
        var idx = parseInt(this.value);
        if (!isNaN(idx) && profiles[idx]) {
            vehicleSelect.value = profiles[idx].type;
            var addr = document.getElementById('bk-address');
            if (addr && profiles[idx].address) addr.value = profiles[idx].address;
            showToast('✅ Véhicule chargé : ' + profiles[idx].name, 'success');
        }
    });
    wrapper.appendChild(label);
    wrapper.appendChild(select);
    vehicleSelect.parentElement.insertBefore(wrapper, vehicleSelect);

    var saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'btn btn-outline';
    saveBtn.textContent = '💾 Sauvegarder ce véhicule';
    saveBtn.style.cssText = 'margin-top:8px;font-size:.85rem;padding:8px 16px';
    saveBtn.addEventListener('click', function () {
        var name = prompt('Nom du véhicule (ex: Ma voiture)');
        if (!name) return;
        var type = vehicleSelect.value;
        var address = document.getElementById('bk-address')?.value || '';
        var profiles = JSON.parse(localStorage.getItem('ecowash_vehicles') || '[]');
        profiles.push({ name: name, type: type, address: address });
        localStorage.setItem('ecowash_vehicles', JSON.stringify(profiles));
        showToast('✅ Véhicule "' + name + '" sauvegardé !', 'success');
        setTimeout(function () { location.reload(); }, 1500);
    });
    vehicleSelect.parentElement.appendChild(saveBtn);
}

/* === ADMIN MESSAGE MANAGEMENT === */
function initAdminMessageMgmt() {
    if (!document.getElementById('tab-messages')) return;
    var origRender = window.renderMessages;
    if (origRender) {
        window.renderMessages = function (list) {
            origRender(list);
            document.querySelectorAll('#tab-messages .msg-card').forEach(function (card, i) {
                var idx = list.length - 1 - i;
                var actions = document.createElement('div');
                actions.style.cssText = 'margin-top:10px;display:flex;gap:8px;flex-wrap:wrap';
                var msgs = JSON.parse(localStorage.getItem('ecowash_messages') || '[]');
                var msg = msgs[idx];
                if (msg) {
                    var readBtn = document.createElement('button');
                    readBtn.className = 'bk-status-btn';
                    readBtn.textContent = msg.read ? '✅ Lu' : '◻️ Marquer lu';
                    readBtn.addEventListener('click', function () {
                        var all = JSON.parse(localStorage.getItem('ecowash_messages') || '[]');
                        all[idx].read = true;
                        localStorage.setItem('ecowash_messages', JSON.stringify(all));
                        showToast('Message marqué comme lu', 'success');
                        loadData();
                    });
                    actions.appendChild(readBtn);
                }
                card.appendChild(actions);
            });
        };
    }
}

/* === ONBOARDING PREMIÈRE VISITE === */
function initOnboarding() {
    if (localStorage.getItem('ecowash_onboarding_done')) return;
    var overlay = document.createElement('div');
    overlay.id = 'onboarding-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:9998;display:flex;align-items:center;justify-content:center;padding:20px';
    var box = document.createElement('div');
    box.style.cssText = 'background:var(--card-bg);border-radius:16px;padding:40px 30px;max-width:400px;width:100%;text-align:center;animation:popIn .3s ease';
    box.innerHTML =
        '<div style="font-size:3rem;margin-bottom:15px">🧼</div>' +
        '<h2 style="margin-bottom:10px">Bienvenue sur EcoWash</h2>' +
        '<p style="color:var(--gray);margin-bottom:20px;font-size:.95rem;line-height:1.6">Le lavage auto sans eau qui vient à vous.<br>Propre, écologique et économique.</p>' +
        '<div style="text-align:left;margin-bottom:20px;font-size:.9rem">' +
        '<div style="padding:6px 0">✅ Réservez en 30 secondes</div>' +
        '<div style="padding:6px 0">✅ Nous venons à domicile</div>' +
        '<div style="padding:6px 0">✅ 10 min chrono</div>' +
        '<div style="padding:6px 0">✅ Dès 1 000 F</div></div>' +
        '<button class="btn btn-block" onclick="closeOnboarding()">C\'est parti !</button>';
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

function closeOnboarding() {
    var el = document.getElementById('onboarding-overlay');
    if (el) {
        el.style.opacity = '0';
        el.style.transition = 'opacity .3s';
        setTimeout(function () { el.remove(); }, 300);
    }
    localStorage.setItem('ecowash_onboarding_done', '1');
}

/* === BOUTONS PARTAGE RÉSEAUX SOCIAUX === */
function initSocialShare() {
    var socialEl = document.getElementById('footer-social');
    if (!socialEl) return;
    var url = encodeURIComponent('https://cideg-dev.github.io/ecowash-app/');
    var text = encodeURIComponent('Découvrez EcoWash 🧼 Lavage auto sans eau au Bénin !');
    var extra = '<br><div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + url + '" target="_blank" style="padding:6px 14px;background:#1877f2;color:white;border-radius:6px;text-decoration:none;font-size:.8rem">Facebook</a>' +
        '<a href="https://wa.me/?text=' + text + '%20' + url + '" target="_blank" style="padding:6px 14px;background:#25D366;color:white;border-radius:6px;text-decoration:none;font-size:.8rem">WhatsApp</a>' +
        '<a href="https://twitter.com/intent/tweet?text=' + text + '&url=' + url + '" target="_blank" style="padding:6px 14px;background:#000;color:white;border-radius:6px;text-decoration:none;font-size:.8rem">X</a>' +
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '" target="_blank" style="padding:6px 14px;background:#0a66c2;color:white;border-radius:6px;text-decoration:none;font-size:.8rem">LinkedIn</a>' +
        '</div>';
    socialEl.innerHTML = socialEl.innerHTML + extra;
}

/* === PRÉFÉRENCES NOTIFICATIONS === */
function initNotifPrefs() {
    var prefs = JSON.parse(localStorage.getItem('ecowash_notif_prefs') || '{"reminder":true,"promo":true,"service":true}');
    var btn = document.createElement('button');
    btn.className = 'btn btn-outline';
    btn.textContent = '🔔 Préférences notifications';
    btn.style.cssText = 'font-size:.85rem;padding:8px 16px;margin-top:10px';
    btn.addEventListener('click', function () {
        var html = '<div style="padding:10px 0"><label style="display:flex;align-items:center;gap:10px;padding:8px 0">' +
            '<input type="checkbox" id="pref-reminder"' + (prefs.reminder ? ' checked' : '') + '> Rappels rendez-vous</label>' +
            '<label style="display:flex;align-items:center;gap:10px;padding:8px 0">' +
            '<input type="checkbox" id="pref-promo"' + (prefs.promo ? ' checked' : '') + '> Offres promo</label>' +
            '<label style="display:flex;align-items:center;gap:10px;padding:8px 0">' +
            '<input type="checkbox" id="pref-service"' + (prefs.service ? ' checked' : '') + '> Rappels service (2 semaines)</label></div>' +
            '<button class="btn btn-block" onclick="saveNotifPrefs()">Enregistrer</button>';
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9998;display:flex;align-items:center;justify-content:center;padding:20px';
        var box = document.createElement('div');
        box.style.cssText = 'background:var(--card-bg);border-radius:12px;padding:30px;max-width:360px;width:100%';
        box.innerHTML = '<h3 style="margin-bottom:15px">🔔 Préférences</h3>' + html;
        overlay.appendChild(box);
        overlay.addEventListener('click', function (e) { if (e.target === this) this.remove(); });
        document.body.appendChild(overlay);
    });
    var notifyBar = document.getElementById('notif-bar');
    if (notifyBar) notifyBar.parentElement.insertBefore(btn, notifyBar.nextSibling);
}

function saveNotifPrefs() {
    var prefs = {
        reminder: document.getElementById('pref-reminder')?.checked || false,
        promo: document.getElementById('pref-promo')?.checked || false,
        service: document.getElementById('pref-service')?.checked || false
    };
    localStorage.setItem('ecowash_notif_prefs', JSON.stringify(prefs));
    document.body.querySelector('div:last-child')?.remove();
    showToast('✅ Préférences enregistrées', 'success');
}

