document.addEventListener('DOMContentLoaded', function () {
    var C = typeof CONFIG !== 'undefined' ? CONFIG : {};
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
            a.addEventListener('click', function () {
                links.classList.remove('active');
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
