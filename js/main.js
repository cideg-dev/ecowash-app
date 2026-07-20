document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            date: new Date().toISOString()
        };

        if (!formData.name || !formData.email || !formData.message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        const messages = JSON.parse(localStorage.getItem('ecowash_messages') || '[]');
        messages.push(formData);
        localStorage.setItem('ecowash_messages', JSON.stringify(messages));

        contactForm.reset();
        formSuccess.classList.remove('hidden');
        formError.classList.add('hidden');

        setTimeout(function () {
            formSuccess.classList.add('hidden');
        }, 5000);
    });

    const testimonials = [
        { text: "Service rapide et professionnel. Ma voiture est impeccable après chaque passage.", author: "Aminata B." },
        { text: "Je suis conquis par la formule écologique. Enfin un produit qui respecte à la fois la voiture et la planète.", author: "Ousmane G." },
        { text: "Équipe très réactive et à l'écoute. Le lavage sans eau est vraiment une révolution !", author: "Koffi N." }
    ];

    function rotateTestimonials() {
        const container = document.getElementById('testimonials-list');
        const cards = container.querySelectorAll('.testimonial');
        if (cards.length === 0) return;

        const first = container.querySelector('.testimonial');
        container.appendChild(first);
    }

    setInterval(rotateTestimonials, 6000);
});
