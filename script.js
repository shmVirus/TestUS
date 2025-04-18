// ==UserScript==
// @name         TorrentBD ID Redirect
// @namespace    Nein✋
// @version      0.1.0
// @description  Redirects any 4-8 digit integer number to torrent link
// @author       G0N
// @match        *://*.torrentbd.net/*
// @match        *://*.torrentbd.org/*
// @match        *://*.torrentbd.me/*
// @match        *://*.torrentbd.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function isValidTorrentId(text) {
        // here change the range d{4,*} (*==if torrent id has more than 8 digits)
        return /^\d{5,8}$/.test(text);
    }

    function getCurrentDomainExt() {
        const hostname = window.location.hostname;
        const match = hostname.match(/torrentbd\.(net|org|me|com)/);
        return match ? match[1] : 'net'; // fallback to .net if not found
    }

    function createTorrentUrl(id) {
        const domainExt = getCurrentDomainExt();
        return `https://www.torrentbd.${domainExt}/torrents-details.php?id=${id}`;
    }

    document.addEventListener('mouseup', function() {
        const selectedText = window.getSelection().toString().trim();

        if (selectedText && isValidTorrentId(selectedText)) {
            window.location.href = createTorrentUrl(selectedText);
        }
    });
})();
