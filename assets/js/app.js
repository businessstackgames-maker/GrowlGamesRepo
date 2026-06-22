/* SatoshiSpin — lobby interactivity (dependency-free) */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var htmlEl = document.documentElement;

  function icon(id) { return '<svg class="ic" aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function hexA(hex, a) {
    var m = hex.replace("#", ""); if (m.length === 3) m = m[0] + m[0] + m[1] + m[1] + m[2] + m[2];
    var n = parseInt(m, 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  /* ----------------------------- data ----------------------------- */
  var GAMES = [
    { name: "Fruit Cash", provider: "Print Studios", tag: "Hold'N'Link", cat: "slots", badge: "hot", motif: "m-cherry", c: ["#2bd46a", "#0c7a3a"] },
    { name: "Luxor Relics", provider: "Print Studios", tag: "Hold'N'Link", cat: "slots", badge: "hot", motif: "m-crown", c: ["#ff8a1e", "#b23a00"] },
    { name: "MMA Legends", provider: "Hacksaw", tag: "Bonus Buy", cat: "slots", badge: "hot", motif: "m-star", c: ["#5D31FF", "#21105e"] },
    { name: "Hit in Vegas", provider: "Relax Gaming", tag: "Megaways", cat: "slots", badge: "new", motif: "m-bell", c: ["#FF00FF", "#6b0049"] },
    { name: "Pompeii Gold", provider: "Big Time Gaming", tag: "Hold'N'Link", cat: "slots", badge: null, motif: "m-coin", c: ["#ffb02e", "#a14b00"] },
    { name: "Fortune Cash", provider: "Betsolutions", tag: "Jackpot", cat: "slots", badge: "new", motif: "m-coin", c: ["#6DCAFD", "#1b4f86"] },
    { name: "Crazy Scientist", provider: "High 5", tag: "Bonus Buy", cat: "slots", badge: null, motif: "m-gem", c: ["#19c39a", "#0a5e49"] },
    { name: "Fu Yin Yang", provider: "Red Tiger", tag: "Hold'N'Link", cat: "slots", badge: null, locked: true, motif: "m-flame", c: ["#ff5252", "#7a0d22"] },
    { name: "African King", provider: "Pragmatic", tag: "Hold'N'Link", cat: "slots", badge: null, motif: "m-crown", c: ["#f0a44b", "#7a3b00"] },
    { name: "Sweet Bonanza", provider: "Pragmatic", tag: "Tumble", cat: "slots", badge: "hot", motif: "m-cherry", c: ["#ff6fb5", "#7a1f56"] },
    { name: "Gates of Olympus", provider: "Pragmatic", tag: "Megaways", cat: "slots", badge: null, motif: "i-bolt", c: ["#8303F9", "#2a0a52"] },
    { name: "Wanted Dead", provider: "Hacksaw", tag: "Bonus Buy", cat: "slots", badge: "new", motif: "m-star", c: ["#c9913f", "#5a3a0c"] },
    { name: "Lightning Roulette", provider: "Evolution", tag: "Live", cat: "live", badge: "hot", motif: "m-wheel", c: ["#DBEE42", "#5a6610"] },
    { name: "Blackjack VIP", provider: "Evolution", tag: "Live", cat: "live", badge: null, motif: "m-spade", c: ["#19a05a", "#0a4427"] },
    { name: "Baccarat Lobby", provider: "Evolution", tag: "Live", cat: "live", badge: null, motif: "m-spade", c: ["#5D31FF", "#180a4d"] },
    { name: "Dragon Tiger", provider: "Evolution", tag: "Live", cat: "live", badge: null, locked: true, motif: "m-flame", c: ["#ff4d4d", "#5e0d0d"] },
    { name: "Crazy Time", provider: "Evolution", tag: "Game Show", cat: "shows", badge: "hot", motif: "m-wheel", c: ["#ff2e7e", "#5e0a35"] },
    { name: "Mega Ball", provider: "Evolution", tag: "Game Show", cat: "shows", badge: "new", motif: "m-ball", c: ["#6DCAFD", "#103a63"] },
    { name: "Monopoly Live", provider: "Evolution", tag: "Game Show", cat: "shows", badge: null, motif: "m-wheel", c: ["#27c46b", "#0c5e34"] },
    { name: "Aviator", provider: "Spribe", tag: "Crash", cat: "shows", badge: "new", motif: "m-rocket", c: ["#ff5a3c", "#7a1500"] }
  ];

  var CAT_MOTIF = { slots: "m-bell", live: "m-spade", shows: "m-wheel" };

  // Real artwork manifests: filled in as files land in assets/img/*.
  // key -> file extension; empty means the built-in fallback art is used.
  var GAME_IMG = {};
  var PROVIDER_IMG = {};
  var COIN_IMG = {};
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }

  var CURRENCIES = [
    { t: "BTC", n: "Bitcoin", sym: "₿", color: "#F7931A", price: 64000, amt: 0.0123 },
    { t: "ETH", n: "Ethereum", sym: "Ξ", color: "#627EEA", price: 3400, amt: 0.42 },
    { t: "USDT", n: "Tether", sym: "₮", color: "#26A17B", price: 1, amt: 100.00231344 },
    { t: "USDC", n: "USD Coin", sym: "$", color: "#2775CA", price: 1, amt: 0 },
    { t: "DOGE", n: "Dogecoin", sym: "Ð", color: "#C2A633", price: 0.14, amt: 0 },
    { t: "TRX", n: "Tron", sym: "T", color: "#EF0027", price: 0.12, amt: 0 },
    { t: "BCH", n: "Bitcoin Cash", sym: "฿", color: "#0AC18E", price: 380, amt: 0 },
    { t: "DAI", n: "Dai", sym: "◈", color: "#F5AC37", price: 1, amt: 0 },
    { t: "XRP", n: "Ripple", sym: "✕", color: "#00A5DF", price: 0.5, amt: 0 },
    { t: "BNB", n: "BNB", sym: "B", color: "#F3BA2F", price: 580, amt: 0 }
  ];

  var state = { filter: "all", query: "" };

  /* ----------------------------- render: currency rail ----------------------------- */
  function coinSym(c) {
    var t = c.t.toLowerCase();
    if (COIN_IMG[t]) return '<span class="coin__sym coin__sym--img"><img src="assets/img/coins/' + t + "." + COIN_IMG[t] + '" alt="" loading="lazy" /></span>';
    return '<span class="coin__sym" style="background:' + c.color + '">' + esc(c.sym) + "</span>";
  }

  function renderRail() {
    var rail = $("#currencyRail"); if (!rail) return;
    rail.innerHTML = CURRENCIES.map(function (c) {
      return '<li class="coin">' + coinSym(c) + esc(c.t) + "</li>";
    }).join("");
  }

  /* ----------------------------- render: game rows ----------------------------- */
  function cardHTML(g) {
    var c0 = g.c[0], c1 = g.c[1];
    var rootStyle = "--cg:" + hexA(c0, 0.5) + ";";
    var gs = slug(g.name);
    var art;
    if (GAME_IMG[gs]) {
      art = '<img class="card__photo" src="assets/img/games/' + gs + "." + GAME_IMG[gs] + '" alt="" loading="lazy" decoding="async" />';
    } else {
      var bg = "radial-gradient(82% 70% at 76% 4%, " + hexA(c0, 0.78) + ", transparent 56%),"
             + "radial-gradient(120% 110% at 8% 116%, " + hexA(c1, 0.98) + ", transparent 64%),"
             + "linear-gradient(155deg, " + c0 + " 0%, " + c1 + " 100%)";
      var motif = g.motif || CAT_MOTIF[g.cat] || "m-gem";
      art = '<span class="card__bg" style="background:' + bg + '"></span>'
          + '<svg class="card__motif" aria-hidden="true"><use href="#' + motif + '"/></svg>';
    }
    var ps = slug(g.provider);
    var prov = PROVIDER_IMG[ps]
      ? '<span class="card__provider card__provider--logo"><img src="assets/img/providers/' + ps + "." + PROVIDER_IMG[ps] + '" alt="' + esc(g.provider) + '" loading="lazy" /></span>'
      : '<span class="card__provider">' + esc(g.provider) + "</span>";
    var parts = g.name.split(" "); var first = parts.shift(); var rest = parts.join(" ");
    var nameHTML = esc(first) + (rest ? "<b>" + esc(rest) + "</b>" : "");
    var name = '<span class="card__name">' + nameHTML + "</span>";
    var tag = '<span class="card__tag">' + esc(g.tag || g.provider) + "</span>";
    if (g.locked) {
      return '<div class="card card--locked" style="' + rootStyle + '" role="group" aria-label="' + esc(g.name) + ' is not available in your region">'
        + '<div class="card__art">' + art + prov + name
        + '<div class="card__lock">' + icon("i-lock") + "<p>Not available in your region</p></div></div>" + tag + "</div>";
    }
    var badge = g.badge === "hot" ? '<span class="card__badge badge-hot">Hot</span>' : g.badge === "new" ? '<span class="card__badge badge-new">New</span>' : "";
    return '<button class="card" type="button" style="' + rootStyle + '" data-game="' + esc(g.name) + '">'
      + '<div class="card__art">' + art + prov + badge + name
      + '<span class="card__play"><span>' + icon("i-play") + "</span></span></div>" + tag + "</button>";
  }

  function rowHTML(title, iconId, games) {
    return '<section class="row">' +
      '<header class="row__head"><h2 class="row__title">' + icon(iconId) + esc(title) + "</h2>" +
      '<div class="row__nav"><button class="row__see" type="button" data-see>See all</button>' +
      '<button class="icon-btn row__arrow" type="button" data-scroll="prev" aria-label="Scroll left">' + icon("i-chev-left") + "</button>" +
      '<button class="icon-btn row__arrow" type="button" data-scroll="next" aria-label="Scroll right">' + icon("i-chev-right") + "</button></div></header>" +
      '<div class="grid">' + games.map(cardHTML).join("") + "</div></section>";
  }

  function renderRows() {
    var host = $("#rows"); if (!host) return;
    var ns = $("#noscript"); if (ns) ns.remove();

    if (state.query) {
      var q = state.query.toLowerCase();
      var res = GAMES.filter(function (g) { return g.name.toLowerCase().indexOf(q) > -1 || g.provider.toLowerCase().indexOf(q) > -1; });
      host.innerHTML = res.length ? rowHTML("Results · " + res.length, "i-search", res)
        : '<p class="noscript">No games match “' + esc(state.query) + "”.</p>";
      return;
    }
    if (state.filter === "all") {
      host.innerHTML =
        rowHTML("Popular", "i-trophy", GAMES.slice(0, 12)) +
        rowHTML("Hottest Games", "i-fire", GAMES.filter(function (g) { return g.badge === "hot"; })) +
        rowHTML("New Releases", "i-gift", GAMES.filter(function (g) { return g.badge === "new"; }));
      return;
    }
    var map = {
      slots: ["Slots", "i-slots", function (g) { return g.cat === "slots"; }],
      live: ["Live Casino", "i-live", function (g) { return g.cat === "live"; }],
      shows: ["Game Shows", "i-shows", function (g) { return g.cat === "shows"; }],
      hot: ["Hottest Games", "i-fire", function (g) { return g.badge === "hot"; }],
      "new": ["New Releases", "i-gift", function (g) { return g.badge === "new"; }]
    };
    var m = map[state.filter] || map.slots;
    host.innerHTML = rowHTML(m[0], m[1], GAMES.filter(m[2]));
  }

  function setFilter(f) {
    state.filter = f; state.query = "";
    var si = $("#searchInput"); if (si) si.value = "";
    $$(".chip").forEach(function (c) {
      var on = c.getAttribute("data-filter") === f;
      c.classList.toggle("is-active", on);
      if (on) c.setAttribute("aria-current", "true"); else c.removeAttribute("aria-current");
    });
    renderRows();
  }

  /* ----------------------------- hero carousel ----------------------------- */
  function initHero() {
    var vp = $(".hero__viewport"), track = $("#heroTrack"), dots = $("#heroDots");
    if (!vp || !track || !dots) return;
    var slides = $$(".banner", track);
    var index = 0, timer = null;

    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Promotion " + (i + 1));
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.addEventListener("click", function () { go(i, true); });
      dots.appendChild(b);
    });
    var dotEls = $$("button", dots);

    function step() { return (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : slides[0].offsetWidth + 16); }
    function go(i, smooth) {
      index = Math.max(0, Math.min(slides.length - 1, i));
      vp.scrollTo({ left: step() * index, behavior: smooth && !REDUCE ? "smooth" : "auto" });
      sync();
    }
    function sync() {
      var i = Math.round(vp.scrollLeft / step());
      index = Math.max(0, Math.min(slides.length - 1, i));
      dotEls.forEach(function (d, di) { d.setAttribute("aria-selected", di === index ? "true" : "false"); });
    }
    var raf;
    vp.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });

    $$("[data-hero]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = btn.getAttribute("data-hero") === "next" ? 1 : -1;
        go((index + dir + slides.length) % slides.length, true);
      });
    });

    function start() { if (REDUCE) return; stop(); timer = setInterval(function () { go((index + 1) % slides.length, true); }, 6000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    vp.addEventListener("pointerenter", stop); vp.addEventListener("pointerleave", start);
    vp.addEventListener("focusin", stop); vp.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    window.addEventListener("resize", function () { go(index, false); });
    start();
  }

  /* ----------------------------- countdowns ----------------------------- */
  function initCountdowns() {
    var els = $$("[data-cd]"); if (!els.length) return;
    var list = els.map(function (el) { return { el: el, t: parseInt(el.getAttribute("data-cd"), 10) || 0 }; });
    function p(n) { return String(n).padStart(2, "0"); }
    function fmt(s) { if (s < 0) s = 0; return p(Math.floor(s / 86400)) + " : " + p(Math.floor(s % 86400 / 3600)) + " : " + p(Math.floor(s % 3600 / 60)) + " : " + p(Math.floor(s % 60)); }
    function tick() { list.forEach(function (o) { o.el.textContent = fmt(o.t); if (o.t > 0) o.t--; }); }
    tick(); setInterval(tick, 1000);
  }

  /* ----------------------------- drawer (mobile sidebar) ----------------------------- */
  var lastFocus = null;
  function openDrawer() {
    var sb = $("#sidebar"), bd = $("#backdrop"); if (!sb) return;
    lastFocus = document.activeElement;
    sb.classList.add("is-open"); if (bd) bd.hidden = false;
    htmlEl.style.overflow = "hidden";
    var f = sb.querySelector(".sidebar__close"); if (f) f.focus();
  }
  function closeDrawer() {
    var sb = $("#sidebar"), bd = $("#backdrop"); if (!sb) return;
    sb.classList.remove("is-open"); if (bd) bd.hidden = true;
    htmlEl.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ----------------------------- modal (auth + deposit) ----------------------------- */
  var modal = $("#modal"), modalInner = $("#modalInner"), modalReturn = null;

  function openModal(html) {
    if (!modal || !modalInner) return;
    modalReturn = document.activeElement;
    modalInner.innerHTML = html;
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    var f = modalInner.querySelector("input, button, [tabindex]"); if (f) f.focus();
  }
  function closeModal() {
    if (!modal) return;
    if (modal.open && typeof modal.close === "function") modal.close(); else modal.removeAttribute("open");
  }
  if (modal) {
    modal.addEventListener("close", function () { modalInner.innerHTML = ""; if (modalReturn && modalReturn.focus) modalReturn.focus(); });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal(); // click on backdrop area
    });
  }

  function authHTML(tab) {
    var join = tab !== "login";
    return '<div class="modal__head"><h2 class="modal__title" id="modalTitle">' + (join ? "Join SatoshiSpin" : "Welcome back") + "</h2>" +
      '<button class="icon-btn" type="button" data-close aria-label="Close">' + icon("i-x") + "</button></div>" +
      '<div class="modal__tabs" role="tablist">' +
      '<button class="modal__tab ' + (join ? "is-active" : "") + '" type="button" role="tab" data-tab="join">Join now</button>' +
      '<button class="modal__tab ' + (!join ? "is-active" : "") + '" type="button" role="tab" data-tab="login">Log in</button></div>' +
      '<form data-authform novalidate>' +
      '<div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="you@email.com" /><span class="field__err" data-err="email"></span></div>' +
      '<div class="field"><label for="f-pass">Password</label><input id="f-pass" name="password" type="password" autocomplete="' + (join ? "new-password" : "current-password") + '" placeholder="••••••••" /><span class="field__err" data-err="password"></span></div>' +
      '<button class="btn ' + (join ? "btn--lime" : "btn--primary") + '" type="submit">' + (join ? "Create account" : "Log in") + "</button>" +
      '<p class="modal__foot">' + (join ? "Already have an account? " : "New to SatoshiSpin? ") +
      '<button type="button" data-tab="' + (join ? "login" : "join") + '">' + (join ? "Log in" : "Join now") + "</button></p></form>";
  }

  function depositHTML() {
    var rows = CURRENCIES.map(function (c, i) {
      var zero = c.amt === 0;
      return '<button class="wallet-row' + (i === 2 ? " is-active" : "") + (zero ? " is-zero" : "") + '" type="button" data-cur="' + c.t + '" role="option" aria-selected="' + (i === 2) + '">' +
        coinSym(c) +
        '<span class="wallet-row__name">' + c.t + " · " + esc(c.n) + "</span>" +
        '<span class="wallet-row__amt" data-amt="' + c.amt + '" data-price="' + c.price + '">' + fmtAmt(c.amt, false) + "</span></button>";
    }).join("");
    return '<div class="modal__head"><h2 class="modal__title" id="modalTitle">Deposit</h2>' +
      '<button class="icon-btn" type="button" data-close aria-label="Close">' + icon("i-x") + "</button></div>" +
      '<div class="dep-toggles">' +
      '<label class="toggle"><input type="checkbox" data-hidezero /><span class="toggle__track"></span>Hide 0 balances</label>' +
      '<label class="toggle"><input type="checkbox" data-fiat /><span class="toggle__track"></span>Display in fiat</label></div>' +
      '<div class="wallet-list" role="listbox" aria-label="Currencies">' + rows + "</div>" +
      '<p class="field__err" style="color:var(--muted);min-height:0;margin-bottom:8px">Send only <b style="color:var(--text)" data-curname>USDT</b> to this address:</p>' +
      '<div class="dep-address"><code data-address>TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t</code>' +
      '<button class="icon-btn" type="button" data-copy aria-label="Copy address">' + icon("i-copy") + "</button></div>" +
      '<button class="btn btn--lime" type="button" data-close>Done</button>';
  }

  function fmtAmt(amt, fiat) {
    if (fiat) return "$" + (amt).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return Number(amt).toLocaleString(undefined, { maximumFractionDigits: 8 });
  }

  var ADDR = { BTC: "bc1qsatoshispin0demo0addr0x9f2c8a7", ETH: "0xSat0shiSpinDem0Addr3ss00009f2c8a71b", USDT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", USDC: "0xSat0shiSpinUsdc0Dem0009f2c8a71bd34", DOGE: "DSat0shiSpinD0ge0Dem0Addr3ss009f2c", TRX: "TSat0shiSpinTrx0Dem0Addr3ss09f2c8a", BCH: "qpsatoshispin0bch0demo0addr0x9f2c", DAI: "0xSat0shiSpinDai0Dem0Addr009f2c8a71", XRP: "rSat0shiSpinXrp0Dem0Addr3ss09f2c8a", BNB: "bnb1satoshispin0demo0addr0x9f2c8a7" };

  // modal internal interactions (delegated)
  if (modalInner) {
    modalInner.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-close]")) { closeModal(); return; }
      var tabBtn = t.closest("[data-tab]");
      if (tabBtn) { openModal(authHTML(tabBtn.getAttribute("data-tab"))); return; }
      var copyBtn = t.closest("[data-copy]");
      if (copyBtn) { copyAddress(); return; }
      var row = t.closest(".wallet-row");
      if (row) {
        $$(".wallet-row", modalInner).forEach(function (r) { r.classList.remove("is-active"); r.setAttribute("aria-selected", "false"); });
        row.classList.add("is-active"); row.setAttribute("aria-selected", "true");
        var cur = row.getAttribute("data-cur");
        var addrEl = $("[data-address]", modalInner), nameEl = $("[data-curname]", modalInner);
        if (addrEl) addrEl.textContent = ADDR[cur] || "-";
        if (nameEl) nameEl.textContent = cur;
      }
    });
    modalInner.addEventListener("change", function (e) {
      var t = e.target;
      if (t.matches("[data-hidezero]")) { var wl = $(".wallet-list", modalInner); if (wl) wl.classList.toggle("hide-zero", t.checked); }
      if (t.matches("[data-fiat]")) {
        $$(".wallet-row__amt", modalInner).forEach(function (a) {
          var amt = parseFloat(a.getAttribute("data-amt")), price = parseFloat(a.getAttribute("data-price"));
          a.textContent = t.checked ? fmtAmt(amt * price, true) : fmtAmt(amt, false);
        });
      }
    });
    modalInner.addEventListener("submit", function (e) {
      var form = e.target.closest("[data-authform]"); if (!form) return;
      e.preventDefault();
      var email = form.email, pass = form.password, ok = true;
      function err(name, msg) { var s = form.querySelector('[data-err="' + name + '"]'); if (s) s.textContent = msg || ""; var inp = form[name]; if (inp) inp.setAttribute("aria-invalid", msg ? "true" : "false"); if (msg) ok = false; }
      err("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Enter a valid email.");
      err("password", pass.value.length >= 8 ? "" : "At least 8 characters.");
      if (ok) { closeModal(); toast("Welcome to SatoshiSpin. Your balance is ready."); }
      else { var bad = form.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); }
    });
  }

  function copyAddress() {
    var el = $("[data-address]", modalInner); if (!el) return;
    var text = el.textContent;
    function done() { toast("Address copied to clipboard."); }
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, fallback); }
    else fallback();
    function fallback() {
      try { var r = document.createRange(); r.selectNode(el); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); document.execCommand("copy"); sel.removeAllRanges(); done(); }
      catch (e) { toast("Copy failed. Select the address manually."); }
    }
  }

  /* ----------------------------- toast ----------------------------- */
  var toastEl = $("#toast"), toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.hidden = false;
    requestAnimationFrame(function () { toastEl.classList.add("is-show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-show");
      setTimeout(function () { toastEl.hidden = true; }, 220);
    }, 2800);
  }

  /* ----------------------------- global wiring ----------------------------- */
  function init() {
    renderRail();
    renderRows();
    initHero();
    initCountdowns();

    // Casino nav group collapse
    var grp = $("[data-group]");
    if (grp) grp.addEventListener("click", function () {
      var open = grp.getAttribute("aria-expanded") === "true";
      grp.setAttribute("aria-expanded", String(!open));
      var sub = document.getElementById(grp.getAttribute("aria-controls"));
      if (sub) sub.classList.toggle("is-collapsed", open);
    });

    // delegated clicks
    document.addEventListener("click", function (e) {
      var t = e.target;

      var f = t.closest("[data-filter]");
      if (f) { e.preventDefault(); setFilter(f.getAttribute("data-filter")); if ($("#sidebar").classList.contains("is-open")) closeDrawer(); var main = $("#main"); if (main && f.closest(".sidebar")) main.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" }); return; }

      if (t.closest("[data-drawer-open]")) { openDrawer(); return; }
      if (t.closest("[data-drawer-close]")) { closeDrawer(); return; }
      if (t.closest("#backdrop")) { closeDrawer(); return; }

      if (t.closest("[data-auth]")) { openModal(authHTML(t.closest("[data-auth]").getAttribute("data-auth"))); return; }
      if (t.closest("[data-deposit]")) { openModal(depositHTML()); return; }

      var toastBtn = t.closest("[data-toast]");
      if (toastBtn) { toast(toastBtn.getAttribute("data-toast")); return; }

      if (t.closest("[data-scroll-top]")) { var m = $("#main"); if (m) m.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" }); return; }

      if (t.closest("[data-mobile-search]")) {
        var s = $(".search"); if (s) { s.classList.add("is-mobile-open"); var inp = $("#searchInput"); if (inp) inp.focus(); }
        return;
      }

      var see = t.closest("[data-see]");
      if (see) { var grid = see.closest(".row").querySelector(".grid"); var all = grid.classList.toggle("is-all"); see.textContent = all ? "Show less" : "See all"; return; }

      var arrow = t.closest("[data-scroll]");
      if (arrow) { var g2 = arrow.closest(".row").querySelector(".grid"); g2.scrollBy({ left: (arrow.getAttribute("data-scroll") === "next" ? 1 : -1) * Math.round(g2.clientWidth * 0.8), behavior: REDUCE ? "auto" : "smooth" }); return; }

      var card = t.closest(".card[data-game]");
      if (card) { toast("Launching " + card.getAttribute("data-game") + "…"); return; }
    });

    // search
    var si = $("#searchInput");
    if (si) {
      si.addEventListener("input", function () { state.query = si.value.trim(); renderRows(); });
      si.addEventListener("blur", function () { var s = $(".search"); if (s && !si.value) s.classList.remove("is-mobile-open"); });
    }
    var searchForm = $(".search");
    if (searchForm) searchForm.addEventListener("submit", function (e) { e.preventDefault(); if (si) { state.query = si.value.trim(); renderRows(); } });

    // escape closes drawer (modal handled natively)
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && $("#sidebar").classList.contains("is-open")) closeDrawer();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
