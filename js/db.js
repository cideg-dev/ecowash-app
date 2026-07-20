var DB = {
    _db: null,
    _ready: null,
    _store: 'ecowash',

    init: function () {
        if (this._ready) return this._ready;
        if (!window.indexedDB) { this._ready = Promise.resolve(); return this._ready; }
        var self = this;
        this._ready = new Promise(function (resolve, reject) {
            var req = indexedDB.open('EcoWashDB', 1);
            req.onupgradeneeded = function (e) {
                var db = e.target.result;
                if (!db.objectStoreNames.contains(self._store)) {
                    db.createObjectStore(self._store, { keyPath: 'key' });
                }
            };
            req.onsuccess = function (e) {
                self._db = e.target.result;
                resolve();
            };
            req.onerror = function () { resolve(); };
        });
        return this._ready;
    },

    get: function (key) {
        return this.init().then(function () {
            if (!DB._db) return null;
            return new Promise(function (resolve) {
                var tx = DB._db.transaction(DB._store, 'readonly');
                var store = tx.objectStore(DB._store);
                var req = store.get(key);
                req.onsuccess = function () { resolve(req.result ? req.result.value : null); };
                req.onerror = function () { resolve(null); };
            });
        });
    },

    set: function (key, value) {
        return this.init().then(function () {
            if (!DB._db) return;
            return new Promise(function (resolve) {
                var tx = DB._db.transaction(DB._store, 'readwrite');
                var store = tx.objectStore(DB._store);
                store.put({ key: key, value: value });
                tx.oncomplete = resolve;
            });
        });
    },

    remove: function (key) {
        return this.init().then(function () {
            if (!DB._db) return;
            return new Promise(function (resolve) {
                var tx = DB._db.transaction(DB._store, 'readwrite');
                var store = tx.objectStore(DB._store);
                store.delete(key);
                tx.oncomplete = resolve;
            });
        });
    },

    savePhoto: function (id, dataUrl) {
        return this.set('photo_' + id, dataUrl);
    },

    getPhoto: function (id) {
        return this.get('photo_' + id);
    }
};
