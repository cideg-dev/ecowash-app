var Cart = {
    key: 'ecowash_cart',

    get: function() {
        try { return JSON.parse(localStorage.getItem(this.key) || '[]'); } catch(e) { return []; }
    },

    save: function(items) {
        localStorage.setItem(this.key, JSON.stringify(items));
        this.updateBadge();
    },

    add: function(product) {
        var items = this.get();
        var existing = items.find(function(i) { return i.id === product.id; });
        if (existing) {
            existing.qty = (existing.qty || 1) + 1;
        } else {
            product.qty = 1;
            items.push(product);
        }
        this.save(items);
        this.notify(product.name + ' ajouté au panier');
    },

    remove: function(id) {
        this.save(this.get().filter(function(i) { return i.id !== id; }));
    },

    updateQty: function(id, qty) {
        var items = this.get();
        var item = items.find(function(i) { return i.id === id; });
        if (item) {
            item.qty = Math.max(1, qty);
        }
        this.save(items);
    },

    clear: function() {
        this.save([]);
    },

    getTotal: function() {
        return this.get().reduce(function(sum, i) { return sum + (i.price || 0) * (i.qty || 1); }, 0);
    },

    getCount: function() {
        return this.get().reduce(function(sum, i) { return sum + (i.qty || 1); }, 0);
    },

    updateBadge: function() {
        var badge = document.querySelector('.cart-badge');
        if (badge) {
            var count = this.getCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    notify: function(msg) {
        var el = document.createElement('div');
        el.className = 'cart-toast';
        el.textContent = msg;
        document.body.appendChild(el);
        setTimeout(function() { el.classList.add('show'); }, 10);
        setTimeout(function() {
            el.classList.remove('show');
            setTimeout(function() { el.remove(); }, 400);
        }, 2500);
    },

    renderCart: function() {
        var container = document.getElementById('cart-items');
        var totalEl = document.getElementById('cart-total');
        var emptyEl = document.getElementById('cart-empty');
        if (!container) return;

        var items = this.get();

        if (emptyEl) emptyEl.style.display = items.length === 0 ? 'block' : 'none';

        if (items.length === 0) {
            container.innerHTML = '';
            if (totalEl) totalEl.textContent = '0 F';
            return;
        }

        var html = '';
        items.forEach(function(item) {
            var price = (item.price || 0) * (item.qty || 1);
            html += '<div class="cart-item" data-id="' + item.id + '">' +
                '<div class="ci-info"><strong>' + item.name + '</strong>' +
                '<span class="ci-price">' + formatPrice(item.price) + ' × ' + item.qty + '</span></div>' +
                '<div class="ci-controls">' +
                '<button class="ci-btn" onclick="Cart.updateQty(\'' + item.id + '\',' + (item.qty - 1) + ');Cart.renderCart();">-</button>' +
                '<span>' + item.qty + '</span>' +
                '<button class="ci-btn" onclick="Cart.updateQty(\'' + item.id + '\',' + (item.qty + 1) + ');Cart.renderCart();">+</button>' +
                '<button class="ci-btn ci-remove" onclick="Cart.remove(\'' + item.id + '\');Cart.renderCart();">&times;</button>' +
                '</div><div class="ci-total">' + formatPrice(price) + '</div></div>';
        });
        container.innerHTML = html;
        if (totalEl) totalEl.textContent = formatPrice(this.getTotal());
    }
};

function formatPrice(val) {
    return Number(val).toLocaleString('fr-FR') + ' F';
}
