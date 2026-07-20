document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.querySelector('.menu-toggle');
    var navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    function animateOnScroll() {
        var elements = document.querySelectorAll('.fade-in');
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        }
    }

    animateOnScroll();

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    var waBtn = document.querySelector('.whatsapp-btn');
    if (waBtn && typeof CONFIG !== 'undefined') {
        var wa = CONFIG.whatsapp;
        waBtn.href = 'https://wa.me/' + wa.number + '?text=' + encodeURIComponent(wa.message);
    }

    var contactForm = document.getElementById('contact-form');
    var formSuccess = document.getElementById('form-success');
    var formError = document.getElementById('form-error');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim(),
                date: new Date().toISOString()
            };

            if (!data.name || !data.email || !data.message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }

            saveToLocal('ecowash_messages', data);

            if (typeof CONFIG !== 'undefined' && CONFIG.email.endpoint) {
                sendEmail(data);
            }

            contactForm.reset();
            formSuccess.classList.remove('hidden');
            formError.classList.add('hidden');
            setTimeout(function () { formSuccess.classList.add('hidden'); }, 5000);
        });
    }

    var bookingForm = document.getElementById('booking-form');
    var bkSuccess = document.getElementById('bk-success');

    if (bookingForm) {
        var dateInput = document.getElementById('bk-date');
        if (dateInput) {
            var today = new Date();
            var y = today.getFullYear();
            var m = String(today.getMonth() + 1).padStart(2, '0');
            var d = String(today.getDate()).padStart(2, '0');
            dateInput.setAttribute('min', y + '-' + m + '-' + d);
        }

        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = {
                name: document.getElementById('bk-name').value.trim(),
                phone: document.getElementById('bk-phone').value.trim(),
                address: document.getElementById('bk-address').value.trim(),
                vehicle: document.getElementById('bk-vehicle').value,
                service: document.getElementById('bk-service').value,
                date: document.getElementById('bk-date').value,
                time: document.getElementById('bk-time').value,
                payment: document.getElementById('bk-payment').value,
                notes: document.getElementById('bk-notes').value.trim(),
                created: new Date().toISOString()
            };

            if (!data.name || !data.phone || !data.address || !data.date) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }

            saveToLocal('ecowash_bookings', data);

            if (typeof CONFIG !== 'undefined' && CONFIG.email.endpoint) {
                sendBookingEmail(data);
            }

            bookingForm.reset();
            bkSuccess.classList.remove('hidden');
            setTimeout(function () { bkSuccess.classList.add('hidden'); }, 6000);
        });
    }

    var reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = {
                name: document.getElementById('rv-name').value.trim(),
                rating: document.getElementById('rv-rating').value,
                message: document.getElementById('rv-message').value.trim(),
                date: new Date().toISOString()
            };
            if (!data.name || !data.message) { alert('Veuillez remplir tous les champs.'); return; }
            saveToLocal('ecowash_reviews', data);

            var container = document.getElementById('testimonials-list');
            var stars = '';
            for (var i = 0; i < parseInt(data.rating); i++) stars += '\u2605';
            var div = document.createElement('div');
            div.className = 'testimonial';
            div.innerHTML = '<div class="stars">' + stars + '</div><p>"' + data.message + '"</p><span class="author">- ' + data.name + '</span>';
            container.appendChild(div);

            reviewForm.reset();
            var msg = document.createElement('div');
            msg.className = 'form-message success';
            msg.textContent = 'Merci pour votre avis !';
            reviewForm.parentNode.appendChild(msg);
            setTimeout(function () { msg.remove(); }, 4000);
        });
    }

    function saveToLocal(key, data) {
        try {
            var items = JSON.parse(localStorage.getItem(key) || '[]');
            items.push(data);
            localStorage.setItem(key, JSON.stringify(items));
        } catch (e) {}
    }

    function sendEmail(data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', CONFIG.email.endpoint, true);
        xhr.setRequestHeader('Accept', 'application/json');
        var fd = new FormData();
        fd.append('name', data.name);
        fd.append('email', data.email);
        fd.append('phone', data.phone || '');
        fd.append('subject', data.subject);
        fd.append('message', data.message);
        xhr.send(fd);
    }

    function sendBookingEmail(data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', CONFIG.email.endpoint, true);
        xhr.setRequestHeader('Accept', 'application/json');
        var fd = new FormData();
        fd.append('_subject', 'Nouveau rendez-vous EcoWash');
        fd.append('name', data.name);
        fd.append('phone', data.phone);
        fd.append('address', data.address);
        fd.append('vehicle', data.vehicle);
        fd.append('service', data.service);
        fd.append('date', data.date);
        fd.append('time', data.time);
        fd.append('payment', data.payment);
        fd.append('notes', data.notes || '');
        xhr.send(fd);
    }

    var testimonialList = document.getElementById('testimonials-list');
    if (testimonialList) {
        setInterval(function () {
            var first = testimonialList.querySelector('.testimonial');
            if (first) testimonialList.appendChild(first);
        }, 6000);
    }
});
