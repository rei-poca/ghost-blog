/* 稍后阅读（收藏）功能：基于 localStorage 的前端收藏列表，不依赖后端密钥 */
(function () {
    'use strict';

    var STORAGE_KEY = 'oss-blog-reading-list';

    function getList() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            var list = raw ? JSON.parse(raw) : [];
            return Array.isArray(list) ? list : [];
        } catch (e) {
            return [];
        }
    }

    function saveList(list) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (e) {
            /* 隐私模式或存储已满时静默失败，界面仍可正常操作 */
        }
    }

    function getMetaFromToggle(btn) {
        var article = btn.closest('.gh-article');
        if (article) {
            var titleEl = article.querySelector('.gh-article-title');
            var imgEl = article.querySelector('.gh-article-image img, .gh-article-header img');
            return {
                url: window.location.href,
                title: titleEl ? titleEl.textContent.trim() : document.title,
                image: imgEl ? imgEl.getAttribute('src') : ''
            };
        }

        var card = btn.closest('.gh-card');
        if (card) {
            var link = card.querySelector('.gh-card-link');
            var titleEl = card.querySelector('.gh-card-title');
            var imgEl = card.querySelector('.gh-card-image img');
            return {
                url: link ? link.getAttribute('href') : window.location.href,
                title: titleEl ? titleEl.textContent.trim() : '',
                image: imgEl ? imgEl.getAttribute('src') : ''
            };
        }

        return {url: window.location.href, title: document.title, image: ''};
    }

    function toggle(btn) {
        var meta = getMetaFromToggle(btn);
        if (!meta.url) {
            return;
        }

        var list = getList();
        var index = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i].url === meta.url) {
                index = i;
                break;
            }
        }

        if (index >= 0) {
            list.splice(index, 1);
        } else {
            list.unshift(meta);
        }

        saveList(list);
        updateToggleStates();
        updateCount();
        renderDrawer();
    }

    function updateToggleStates() {
        var list = getList();
        var toggles = document.querySelectorAll('[data-bookmark-toggle]');
        for (var i = 0; i < toggles.length; i++) {
            var meta = getMetaFromToggle(toggles[i]);
            var saved = false;
            for (var j = 0; j < list.length; j++) {
                if (list[j].url === meta.url) {
                    saved = true;
                    break;
                }
            }
            toggles[i].setAttribute('aria-pressed', saved ? 'true' : 'false');
            toggles[i].classList.toggle('is-saved', saved);
        }
    }

    function updateCount() {
        var count = getList().length;
        var badges = document.querySelectorAll('[data-bookmarks-count]');
        for (var i = 0; i < badges.length; i++) {
            badges[i].textContent = count;
            badges[i].hidden = count === 0;
        }
    }

    function renderDrawer() {
        var list = getList();
        var listEl = document.querySelector('[data-bookmarks-list]');
        var emptyEl = document.querySelector('[data-bookmarks-empty]');
        var clearBtn = document.querySelector('[data-bookmarks-clear]');
        if (!listEl) {
            return;
        }

        listEl.innerHTML = '';

        for (var i = 0; i < list.length; i++) {
            (function (item) {
                var li = document.createElement('li');
                li.className = 'gh-bookmarks-item';

                var link = document.createElement('a');
                link.className = 'gh-bookmarks-item-link';
                link.href = item.url;

                if (item.image) {
                    var img = document.createElement('img');
                    img.className = 'gh-bookmarks-item-image';
                    img.src = item.image;
                    img.alt = '';
                    img.loading = 'lazy';
                    link.appendChild(img);
                }

                var title = document.createElement('span');
                title.className = 'gh-bookmarks-item-title';
                title.textContent = item.title || item.url;
                link.appendChild(title);

                li.appendChild(link);

                var remove = document.createElement('button');
                remove.className = 'gh-bookmarks-item-remove gh-icon-button';
                remove.type = 'button';
                remove.setAttribute('data-bookmarks-remove', item.url);
                remove.setAttribute('aria-label', '移除');
                remove.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>';
                li.appendChild(remove);

                listEl.appendChild(li);
            })(list[i]);
        }

        if (emptyEl) {
            emptyEl.hidden = list.length > 0;
        }
        if (clearBtn) {
            clearBtn.hidden = list.length === 0;
        }
    }

    function openDrawer() {
        var drawer = document.querySelector('[data-bookmarks-drawer]');
        if (!drawer) {
            return;
        }
        renderDrawer();
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        document.documentElement.style.overflowY = 'hidden';
    }

    function closeDrawer() {
        var drawer = document.querySelector('[data-bookmarks-drawer]');
        if (!drawer) {
            return;
        }
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        document.documentElement.style.overflowY = null;
    }

    function removeItem(url) {
        var list = getList().filter(function (item) {
            return item.url !== url;
        });
        saveList(list);
        updateToggleStates();
        updateCount();
        renderDrawer();
    }

    function clearAll() {
        saveList([]);
        updateToggleStates();
        updateCount();
        renderDrawer();
    }

    document.addEventListener('click', function (e) {
        var toggle = e.target.closest('[data-bookmark-toggle]');
        if (toggle) {
            e.preventDefault();
            toggle(toggle);
            return;
        }

        if (e.target.closest('[data-bookmarks-trigger]')) {
            e.preventDefault();
            openDrawer();
            return;
        }

        if (e.target.closest('[data-bookmarks-close]')) {
            closeDrawer();
            return;
        }

        var remove = e.target.closest('[data-bookmarks-remove]');
        if (remove) {
            removeItem(remove.getAttribute('data-bookmarks-remove'));
            return;
        }

        if (e.target.closest('[data-bookmarks-clear]')) {
            clearAll();
            return;
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeDrawer();
        }
    });

    updateToggleStates();
    updateCount();
    renderDrawer();
})();
