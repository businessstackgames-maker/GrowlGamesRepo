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
    { name: "Supercharged Clovers", provider: "Playson", tag: "Hold & Win", cat: "slots", badge: "hot", c: ["#2bd46a", "#0c7a3a"] },
    { name: "Egypt Power x1000", provider: "3 Oaks", tag: "Hold & Win", cat: "slots", badge: "hot", c: ["#ffb02e", "#a14b00"] },
    { name: "Wanted Dead or a Wild", provider: "Hacksaw", tag: "Bonus Buy", cat: "slots", badge: "hot", c: ["#c9913f", "#5a3a0c"] },
    { name: "Legacy of Dead", provider: "Play'n GO", tag: "Megaways", cat: "slots", badge: "new", c: ["#ff8a1e", "#b23a00"] },
    { name: "Sea Bass Hot-Pot Bonanza", provider: "18 Peaches", tag: "Tumble", cat: "slots", badge: null, c: ["#ffcf3a", "#a36a00"] },
    { name: "Ra's Reckoning", provider: "Play'n GO", tag: "Bonus Buy", cat: "slots", badge: "new", c: ["#ff5a3c", "#7a1500"] },
    { name: "Majestic King: Ice Kingdom", provider: "Spinomenal", tag: "Hold & Win", cat: "slots", badge: null, c: ["#a07bd6", "#3a1f6b"] },
    { name: "Lava Burst", provider: "Evoplay", tag: "Cluster Pays", cat: "slots", badge: null, c: ["#ff5a2e", "#7a1500"] },
    { name: "Hiphop Pop", provider: "AvatarUX", tag: "Tumble", cat: "slots", badge: "new", c: ["#ff6fb5", "#7a1f56"] },
    { name: "Rust and Riches", provider: "Degen", tag: "Bonus Buy", cat: "slots", badge: null, c: ["#DBEE42", "#5a6610"] },
    { name: "Bounty of the Seas 2", provider: "Novomatic", tag: "Hold & Win", cat: "slots", badge: null, c: ["#8a5cff", "#2a0a52"] },
    { name: "Break the Piggy Bank", provider: "Penguin King", tag: "Hold & Win", cat: "slots", badge: null, c: ["#a05cff", "#3a1060"] },
    { name: "Reactoonz 100", provider: "Play'n GO", tag: "Cluster Pays", cat: "slots", badge: "hot", c: ["#19c39a", "#0a5e49"] },
    { name: "Black Seven Bell Link", provider: "EGT", tag: "Bell Link", cat: "slots", badge: null, c: ["#9a5cff", "#2a0a52"] },
    { name: "40 Mega Hotfire", provider: "Novomatic", tag: "Jackpot", cat: "slots", badge: "new", c: ["#27c46b", "#0c5e34"] },
    { name: "War of Bets", provider: "BetGames", tag: "Live", cat: "live", badge: "hot", c: ["#ff4d4d", "#5e0d0d"] },
    { name: "Poker 6+", provider: "BetGames", tag: "Live", cat: "live", badge: null, c: ["#ff5252", "#5e0d0d"] },
    { name: "Cash Wheel Carnival", provider: "Microgaming", tag: "Game Show", cat: "shows", badge: "hot", c: ["#ff7a2e", "#7a1500"] },
    { name: "Mega Fire Blaze: Lucky Ball", provider: "Playtech", tag: "Game Show", cat: "shows", badge: "new", c: ["#2f7aff", "#0a2a6b"] },
    { name: "Aviator", provider: "Spribe", tag: "Crash", cat: "shows", badge: "hot", c: ["#ff5a3c", "#7a0d0d"] }
  ];

  var CAT_MOTIF = { slots: "m-bell", live: "m-spade", shows: "m-wheel" };

  // Real artwork manifests: filled in as files land in assets/img/*.
  // key -> file extension; empty means the built-in fallback art is used.
  var GAME_IMG = {
    "supercharged-clovers": "jpg", "egypt-power-x1000": "jpg", "wanted-dead-or-a-wild": "jpg",
    "legacy-of-dead": "jpg", "sea-bass-hot-pot-bonanza": "jpg", "ra-s-reckoning": "jpg",
    "majestic-king-ice-kingdom": "jpg", "lava-burst": "jpg", "hiphop-pop": "jpg",
    "rust-and-riches": "jpg", "bounty-of-the-seas-2": "jpg", "break-the-piggy-bank": "jpg",
    "reactoonz-100": "jpg", "black-seven-bell-link": "jpg", "40-mega-hotfire": "jpg",
    "war-of-bets": "jpg", "poker-6": "jpg", "cash-wheel-carnival": "jpg",
    "mega-fire-blaze-lucky-ball": "jpg", "aviator": "jpg"
  };
  var PROVIDER_IMG = {};
  var COIN_IMG = { btc: "svg", eth: "svg", usdt: "svg", usdc: "svg", doge: "svg", trx: "svg", bch: "svg", bnb: "svg", xrp: "svg" };
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // Extra uploaded thumbnails (no name/metadata) — used as clean, name-free tiles.
  var EXTRA_IMG = [
    "0f794495-65ba-44f0-bbb8-7ec3dbec83df.jfif",
    "86efef39-c84f-411b-8c84-a7be5092e623.jpg", "8fefce9e-3a4c-4226-a06f-cda16b91b7a8.jpg",
    "b90a2f75-8900-4539-a57d-271bdc768683.jpg", "b420262e-8ac9-4bb1-91a6-10adeb604045.jpg",
    "c76a9d55-c3d1-416a-aa5c-d19ac4862039.jpg", "9964b460-a760-415d-8572-b8fa3feca741.jpg",
    "d62a910c-a74a-4c3b-92f6-2e18c8fa8268.jpg", "a80f7426-0df7-4d75-b893-af370bf3a0c8.jpg",
    "ce04c203-411a-4d5a-bf8d-09e7cc9979c0.jpg", "92b52bb7-6678-43c3-ae40-a3cd751c5220.jpg",
    "a9e307aa-714f-4d52-a8a8-2ab68637a916.jpg", "98fec924-d832-42a4-9614-69ce7b1e3bff.jpg",
    "a3e843c5-66ac-44ab-bb6a-52edf89d6b8e.jpg", "d92aa4c0-8ecf-472f-b8e9-ec465908dfce.jpg",
    "bab08f68-8388-4f54-a17b-0187a07c7104.jpg", "ec6e3534-cc2c-4006-b4a6-11679606c7f0.jpg",
    "ed3dcce6-3656-4ecf-8dcc-7745e9c9ad27.jpg", "fcb182f4-0afb-4575-8ba5-11ecd1944c74.jfif"
  ];
  var XCAT = ["slots", "slots", "slots", "live", "shows"], XBADGE = ["hot", null, "new", null, null, "hot", null];
  var EXTRA = EXTRA_IMG.map(function (f, i) {
    return { img: f, cat: XCAT[i % XCAT.length], badge: XBADGE[i % XBADGE.length], tag: "", c: ["#5D31FF", "#1a0e3a"] };
  });
  var NAMED = GAMES.slice();                       // titled games (name + thumbnail)
  var POOL = shuffle(NAMED.concat(EXTRA));          // shuffled once; rows take disjoint slices so nothing repeats on screen

  // Providers showcase. Logos ship in assets/img/providers/; per-studio background + character art
  // are uploaded to assets/img/providers/backgrounds|characters/<slug>.{jpg,png} (graceful fallback until then).
  var PROVIDERS = [
    { n: "BGaming", logo: "bgg", c: "#3a2b6b", bg: "BGSlot_BOTTOM.png", char: "caishen-god-of-fortune-character-full.png" },
    { n: "Hacksaw", logo: "hs", c: "#5a2d86", bg: "BGFree_BOTTOM.png", char: "midnight-bandits-character-full.png" },
    { n: "NetEnt", logo: "ne", c: "#1f5a8a", bg: "BGBonus_BOTTOM.png", char: "golden-destiny-character-full.png" },
    { n: "Novomatic", logo: "novo", c: "#2a4a8a", bg: "BGmatch3_BOTTOM.png", char: "coins-of-dragon-character-full.png" },
    { n: "Play'n GO", logo: "playngo_logo", c: "#7a2d5a", bg: "BGPickMe_BOTTOM.jpg", char: "a-big-catch-character-full.png" },
    { n: "Pragmatic Play", logo: "pp", c: "#8a3a2a", bg: "BGFree2.png", char: "disco-farm-character-full.png" },
    { n: "Relax Gaming", logo: "relax", c: "#2a6b5a", bg: "BGSlot_BOTTOM_1.png", char: "coins-of-leprechaun-character-full.png" },
    { n: "Yggdrasil", logo: "yggdrasil", c: "#2a3a7a", bg: "BGSlot_BOTTOM_.jpg", char: "3-pots-of-wishes-character-full.png" },
    { n: "Nolimit City", logo: "nolimit", c: "#6b2a2a", bg: "BGFree_BOTTOM.jpg", char: "dr-jekyll-mr-hyde-2-character-full.png" },
    { n: "Red Tiger", logo: "redtiger", c: "#7a2424", bg: "BGBonus_BOTTOM.png", char: "after-night-falls-2-character-full.png" },
    { n: "PG Soft", logo: "pg", c: "#2a6b3a", bg: "BGmatch3_BOTTOM.png", char: "mamma-mia-2-character-full.png" },
    { n: "Evolution", logo: "ev", c: "#1a4a3a", bg: "BGPickMe_BOTTOM.jpg", char: "the-neighbor-wars-character-full.png" }
  ];

  // sample data helpers for the live wins ticker + latest bets feed
  var USER_W = ["Lucky", "Crypto", "Neon", "Mega", "Spin", "Degen", "Vault", "Pixel", "Turbo", "Golden", "Shadow", "Nova", "Blitz", "Ace", "Wild", "Hodl"];
  function randUser() {
    if (Math.random() < 0.5) return "User" + (100000 + Math.floor(Math.random() * 899999));
    var n = USER_W[Math.floor(Math.random() * USER_W.length)] + (Math.floor(Math.random() * 9000) + 100);
    return n.length > 12 ? n.slice(0, 11) + "…" : n;
  }
  function gameFile(g) { return g.img || (slug(g.name) + "." + (GAME_IMG[slug(g.name)] || "jpg")); }
  function fmtUSD(n) { return "$" + Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function randMult() {
    var r = Math.random();
    if (r < 0.6) return +(Math.random() * 0.99).toFixed(2);     // loss
    if (r < 0.9) return +(1 + Math.random() * 4).toFixed(2);    // modest win
    return +(5 + Math.random() * 390).toFixed(2);               // big win
  }
  function nowTime() {
    var d = new Date(), h = d.getHours(), ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12;
    function p(n) { return String(n).padStart(2, "0"); }
    return p(h) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds()) + " " + ap;
  }

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
  function cardHTML(g, opts) {
    opts = opts || {};
    var c0 = (g.c && g.c[0]) || "#5D31FF", c1 = (g.c && g.c[1]) || "#1a0e3a";
    var rootStyle = "--cg:" + hexA(c0, 0.5) + ";";
    var file = g.img || (GAME_IMG[slug(g.name)] ? slug(g.name) + "." + GAME_IMG[slug(g.name)] : null);
    var label = g.name || "Casino game";
    var art, artClass;
    if (file) {
      // gradient sits behind the photo so a slow/failed image never shows a blank tile
      artClass = "card__art card__art--photo";
      art = '<span class="card__bg" style="background:linear-gradient(155deg,' + c0 + ',' + c1 + ')"></span>'
          + '<img class="card__photo" src="assets/img/games/' + file + '" alt="" loading="lazy" decoding="async" onerror="this.remove()" />';
    } else {
      artClass = "card__art";
      var bg = "radial-gradient(82% 70% at 76% 4%, " + hexA(c0, 0.78) + ", transparent 56%),"
             + "radial-gradient(120% 110% at 8% 116%, " + hexA(c1, 0.98) + ", transparent 64%),"
             + "linear-gradient(155deg, " + c0 + " 0%, " + c1 + " 100%)";
      var motif = g.motif || CAT_MOTIF[g.cat] || "m-gem";
      art = '<span class="card__bg" style="background:' + bg + '"></span>'
          + '<svg class="card__motif" aria-hidden="true"><use href="#' + motif + '"/></svg>';
    }
    // game name + provider tag intentionally omitted — tiles are pure artwork
    if (g.locked) {
      return '<div class="card card--locked" style="' + rootStyle + '" role="group" aria-label="' + esc(label) + ' is not available in your region">'
        + '<div class="' + artClass + '">' + art
        + '<div class="card__lock">' + icon("i-lock") + "<p>Not available in your region</p></div></div></div>";
    }
    var b = opts.badge !== undefined ? opts.badge : g.badge;
    var badge = b === "hot" ? '<span class="card__badge badge-hot">Hot</span>' : b === "new" ? '<span class="card__badge badge-new">New</span>' : "";
    return '<button class="card" type="button" style="' + rootStyle + '" data-game="' + esc(label) + '" aria-label="' + esc(label) + '">'
      + '<div class="' + artClass + '">' + art + badge
      + '<span class="card__play"><span>' + icon("i-play") + "</span></span></div></button>";
  }

  function rowHTML(title, iconId, games, rowBadge) {
    return '<section class="row">' +
      '<header class="row__head"><h2 class="row__title">' + icon(iconId) + esc(title) + "</h2>" +
      '<div class="row__nav"><button class="row__see" type="button" data-see>See all</button>' +
      '<button class="icon-btn row__arrow" type="button" data-scroll="prev" aria-label="Scroll left">' + icon("i-chev-left") + "</button>" +
      '<button class="icon-btn row__arrow" type="button" data-scroll="next" aria-label="Scroll right">' + icon("i-chev-right") + "</button></div></header>" +
      '<div class="grid">' + games.map(function (g) { return cardHTML(g, rowBadge !== undefined ? { badge: rowBadge } : undefined); }).join("") + "</div></section>";
  }

  function renderRows() {
    var host = $("#rows"); if (!host) return;
    var ns = $("#noscript"); if (ns) ns.remove();

    if (state.query) {
      var q = state.query.toLowerCase();
      var res = NAMED.filter(function (g) { return g.name.toLowerCase().indexOf(q) > -1 || (g.provider && g.provider.toLowerCase().indexOf(q) > -1); });
      host.innerHTML = res.length ? rowHTML("Results · " + res.length, "i-search", res)
        : '<p class="noscript">No games match “' + esc(state.query) + "”.</p>";
      return;
    }
    if (state.filter === "all") {
      // disjoint slices of the shuffled pool → no thumbnail repeats across the visible rows
      host.innerHTML =
        rowHTML("Popular", "i-trophy", POOL.slice(0, 14)) +
        rowHTML("Hottest Games", "i-fire", POOL.slice(14, 28), "hot") +
        rowHTML("New Releases", "i-gift", POOL.slice(28, 42), "new");
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
    host.innerHTML = rowHTML(m[0], m[1], POOL.filter(m[2]));
  }

  /* ----------------------------- render: live wins · providers · latest bets ----------------------------- */
  function renderWins() {
    var track = $("#winsTrack"); if (!track) return;
    var items = [];
    for (var i = 0; i < 14; i++) {
      var g = POOL[Math.floor(Math.random() * POOL.length)];
      var amt = +(Math.random() * Math.random() * 900 + 1).toFixed(2);
      items.push('<div class="win"><img class="win__thumb" src="assets/img/games/' + gameFile(g) +
        '" alt="" loading="lazy" decoding="async" onerror="this.style.visibility=\'hidden\'" />' +
        '<span class="win__user">' + esc(randUser()) + '</span><span class="win__amt">' + fmtUSD(amt) + "</span></div>");
    }
    var html = items.join("");
    track.innerHTML = REDUCE ? html : html + html;   // duplicate for a seamless marquee loop
    track.classList.toggle("is-anim", !REDUCE);
  }

  function renderProviders() {
    var track = $("#providersTrack"); if (!track) return;
    track.innerHTML = PROVIDERS.map(function (p) {
      return '<button class="provider" type="button" style="--pc:' + p.c + '" data-provider="' + esc(p.n) + '" aria-label="' + esc(p.n) + ' games">' +
        '<img class="provider__bg" src="assets/img/providers/backgrounds/' + p.bg + '" alt="" loading="lazy" decoding="async" onerror="this.remove()" />' +
        '<span class="provider__scrim" aria-hidden="true"></span>' +
        '<img class="provider__char" src="assets/img/providers/characters/' + p.char + '" alt="" loading="lazy" decoding="async" onerror="this.remove()" />' +
        '<span class="provider__logo"><img src="assets/img/providers/' + p.logo + '.svg" alt="' + esc(p.n) + '" loading="lazy" decoding="async" onerror="this.outerHTML=\'<span>\'+this.alt+\'</span>\'" /></span>' +
        "</button>";
    }).join("");
  }

  var FOOTER_COINS = ["btc", "eth", "usdt", "bnb", "ltc", "bch", "usdc", "sol", "shiba", "xrp", "ton", "dot", "matic", "trx", "doge", "ada", "pix", "visa", "mastercard", "blink", "interac", "bank"];
  function renderFooterCoins() {
    var host = $("#footerCoins"); if (!host) return;
    host.innerHTML = FOOTER_COINS.map(function (c) {
      return '<li class="pay"><img src="assets/img/coins/' + c + '.svg" alt="" loading="lazy" decoding="async" onerror="this.closest(\'.pay\').remove()" /></li>';
    }).join("");
  }

  function betRowHTML(isNew) {
    var g = NAMED[Math.floor(Math.random() * NAMED.length)];
    var bet = +(Math.random() * 2.9 + 0.03).toFixed(2);
    var mult = randMult(), pay = +(bet * mult).toFixed(2), win = mult >= 1;
    return '<tr class="bets__row' + (isNew ? " bets__row--new" : "") + '">' +
      '<td><span class="bets__game"><img class="bets__thumb" src="assets/img/games/' + gameFile(g) +
      '" alt="" loading="lazy" decoding="async" onerror="this.style.visibility=\'hidden\'" />' +
      '<span class="bets__name">' + esc(g.name) + "</span></span></td>" +
      '<td class="col-time bets__time">' + nowTime() + "</td>" +
      '<td class="col-player bets__player">' + esc(randUser()) + "</td>" +
      "<td>" + fmtUSD(bet) + "</td>" +
      '<td><span class="bets__mult' + (win ? " is-win" : "") + '">x' + mult.toFixed(2) + "</span></td>" +
      '<td class="col-r"><span class="bets__pay' + (win ? " is-win" : "") + '">' + fmtUSD(pay) + "</span></td></tr>";
  }
  function renderBets() {
    var body = $("#betsBody"); if (!body) return;
    var rows = ""; for (var i = 0; i < 10; i++) rows += betRowHTML(false);
    body.innerHTML = rows;
    if (REDUCE) return;
    setInterval(function () {
      if (document.hidden) return;
      body.insertAdjacentHTML("afterbegin", betRowHTML(true));
      while (body.children.length > 10) body.removeChild(body.lastChild);
    }, 3500);
  }

  /* ----------------------------- live community chat ----------------------------- */
  var CHAT_LINES = [
    "gg 🎉", "lets go", "big win on aviator!", "x100 lfg 🚀", "anyone playing slots rn?",
    "wagering for the raffle", "rip my balance lol", "nice hit man", "up 2 eth today 😎",
    "who's online?", "to the moon", "just claimed my free spin", "down bad ngl",
    "this game is hot 🔥", "gl everyone", "cashed out at x5 💰", "new releases slap",
    "gm degens", "first time here, any tips?", "stacking sats", "that bonus round tho",
    "good luck on the wager rush", "+0.3 btc lets goo", "back to back wins 🤑", "respect the bankroll"
  ];
  function initChat() {
    var panel = $("#chatPanel"), log = $("#chatLog"), tab = $(".chat-tab"), online = $("#chatOnline");
    if (!panel || !log) return;
    var counter = 0;
    function chatTime() { var d = new Date(), h = d.getHours(), ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + ":" + String(d.getMinutes()).padStart(2, "0") + " " + ap; }
    var AVATARS = ["avatar-svgrepo-com.svg", "avatar-svgrepo-com (1).svg", "avatar-svgrepo-com (2).svg", "avatar-svgrepo-com (3).svg", "avatar-svgrepo-com (4).svg", "avatar-svgrepo-com (5).svg", "avatar-svgrepo-com (6).svg", "avatar-svgrepo-com (7).svg", "avatar-svgrepo-com (8).svg", "avatar-svgrepo-com (9).svg", "avatar-svgrepo-com (10).svg"];
    function avatar(name, i) {
      var initial = (name.replace(/[^A-Za-z0-9]/g, "").charAt(0) || "U").toUpperCase();
      var src = "assets/img/avatars/" + encodeURI(AVATARS[i % AVATARS.length]);
      return '<span class="chat__avatar" style="--ah:' + ((i * 53) % 360) + '"><img src="' + src + '" alt="" loading="lazy" decoding="async" onerror="this.remove()" /><b>' + initial + "</b></span>";
    }
    function push(name, text, i, me) {
      var atBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 90;
      var el = document.createElement("div");
      el.className = "chat__msg" + (me ? " chat__msg--me" : "");
      el.innerHTML = avatar(name, i) +
        '<div class="chat__bubble"><div class="chat__from"><span class="chat__name">' + esc(name) +
        '</span><span class="chat__time">' + chatTime() + '</span></div><div class="chat__text">' + esc(text) + "</div></div>";
      log.appendChild(el);
      while (log.children.length > 40) log.removeChild(log.firstChild);
      if (atBottom || me) log.scrollTop = log.scrollHeight;
    }
    function randomMsg() { push(randUser(), CHAT_LINES[Math.floor(Math.random() * CHAT_LINES.length)], counter++, false); }
    for (var k = 0; k < 12; k++) randomMsg();
    log.scrollTop = log.scrollHeight;
    if (online) setInterval(function () { if (!document.hidden) online.textContent = (2300 + Math.floor(Math.random() * 400)).toLocaleString(); }, 5000);
    if (!REDUCE) setInterval(function () { if (!document.hidden) randomMsg(); }, 4200);

    function toggle() {
      var open = panel.classList.toggle("is-open");
      panel.setAttribute("aria-hidden", String(!open));
      if (tab) { tab.classList.toggle("is-hidden", open); tab.setAttribute("aria-expanded", String(open)); }
      if (open) log.scrollTop = log.scrollHeight;
    }
    $$("[data-chat-toggle]").forEach(function (b) { b.addEventListener("click", toggle); });
    var form = $("[data-chat-form]"), input = $("#chatInput");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = (input.value || "").trim();
      if (!v) { toast("Sign in to join the community chat."); return; }
      push("You", v, 999, true); input.value = "";
    });
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
    var list = els.map(function (el) { return { el: el, t: parseInt(el.getAttribute("data-cd"), 10) || 0, compact: el.getAttribute("data-fmt") === "compact" }; });
    function p(n) { return String(n).padStart(2, "0"); }
    function fmt(s) { if (s < 0) s = 0; return p(Math.floor(s / 86400)) + " : " + p(Math.floor(s % 86400 / 3600)) + " : " + p(Math.floor(s % 3600 / 60)) + " : " + p(Math.floor(s % 60)); }
    function fmtCompact(s) { if (s < 0) s = 0; return Math.floor(s / 86400) + "d " + Math.floor(s % 86400 / 3600) + "h " + Math.floor(s % 3600 / 60) + "m"; }
    function tick() { list.forEach(function (o) { o.el.textContent = o.compact ? fmtCompact(o.t) : fmt(o.t); if (o.t > 0) o.t--; }); }
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
    modal.classList.toggle("modal--wide", !!modalInner.querySelector(".auth"));
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    var f = modalInner.querySelector("input") || modalInner.querySelector("button"); if (f) f.focus();
  }
  function closeModal() {
    if (!modal) return;
    if (modal.open && typeof modal.close === "function") modal.close(); else modal.removeAttribute("open");
  }
  if (modal) {
    modal.addEventListener("close", function () { modalInner.innerHTML = ""; modal.classList.remove("modal--wide"); if (modalReturn && modalReturn.focus) modalReturn.focus(); });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal(); // click on backdrop area
    });
  }

  function authHTML(tab) {
    var join = tab !== "login";
    var form =
      '<form data-authform novalidate>' +
        (join ? '<div class="field"><label for="f-user">Username</label><input id="f-user" name="username" type="text" autocomplete="username" placeholder="Username" /><span class="field__err" data-err="username"></span></div>' : "") +
        '<div class="field"><label for="f-email">Email Address</label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="Email Address" /><span class="field__err" data-err="email"></span></div>' +
        '<div class="field"><label for="f-pass">Password</label>' +
          '<div class="field__pass"><input id="f-pass" name="password" type="password" autocomplete="' + (join ? "new-password" : "current-password") + '" placeholder="Password" />' +
          '<button class="field__eye" type="button" data-eye aria-label="Show password">' + icon("i-eye") + "</button></div>" +
          (join ? '<span class="field__hint">Password must be at least 7 characters</span>' : "") +
          '<span class="field__err" data-err="password"></span></div>' +
        (join ? '<details class="auth__ref"><summary>Referral Code (Optional)</summary><div class="field"><input name="ref" type="text" placeholder="Referral code" autocomplete="off" /></div></details>' : "") +
        (join ? '<label class="auth__terms"><input type="checkbox" data-terms /><span>I am 18+ and have read and accept the <button type="button" class="linkish" data-toast="Terms of Service — demo placeholder.">Terms of Service</button> and <button type="button" class="linkish" data-toast="Privacy Policy — demo placeholder.">Privacy Policy</button>.</span></label>' : "") +
        '<button class="btn btn--lime auth__submit" type="submit">' + (join ? "Play Now" : "Login") + "</button>" +
      "</form>" +
      '<div class="auth__or"><span>Or continue with</span></div>' +
      '<div class="auth__sso">' +
        '<button class="btn" type="button" data-toast="Google sign-in is a demo placeholder."><img class="sso-ic" src="assets/img/register/google.svg" alt="" onerror="this.outerHTML=\'<b class=\\\'sso-g\\\'>G</b>\'" />Google</button>' +
        '<button class="btn" type="button" data-toast="MetaMask connect is a demo placeholder."><img class="sso-ic" src="assets/img/register/metamask.svg" alt="" onerror="this.outerHTML=\'<span class=\\\'sso-m\\\'>🦊</span>\'" />Metamask</button>' +
      "</div>" +
      '<p class="auth__legal">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>';

    return '<div class="auth">' +
      '<div class="auth__form">' +
        '<button class="icon-btn auth__close" type="button" data-close aria-label="Close">' + icon("i-x") + "</button>" +
        '<h2 class="auth__title" id="modalTitle">' + (join ? "Create your account" : "Welcome back") + "</h2>" +
        '<p class="auth__sub">' + (join ? "Already have an account? " : "New to SatoshiSpin? ") +
          '<button type="button" data-tab="' + (join ? "login" : "join") + '">' + (join ? "Login" : "Join now") + "</button></p>" +
        form +
      "</div>" +
      '<div class="auth__art" aria-hidden="true">' +
        '<img class="auth__bg" src="assets/img/register/background.jpeg" alt="" onerror="this.remove()" />' +
        '<span class="auth__scrim"></span>' +
        '<img class="auth__char" src="assets/img/register/character.png" alt="" onerror="this.remove()" />' +
        '<img class="auth__flying" src="assets/img/register/flying.png" alt="" onerror="this.remove()" />' +
        '<div class="auth__caption"><h3>Charles Oliveira</h3><span class="auth__badge">BMF Champion</span></div>' +
      "</div></div>";
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
      var eye = t.closest("[data-eye]");
      if (eye) { var pi = $("#f-pass", modalInner); if (pi) { var show = pi.type === "password"; pi.type = show ? "text" : "password"; eye.setAttribute("aria-label", show ? "Hide password" : "Show password"); } return; }
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
      var join = !!form.username;
      var ok = true;
      function err(name, msg) { var s = form.querySelector('[data-err="' + name + '"]'); if (s) s.textContent = msg || ""; var inp = form[name]; if (inp) inp.setAttribute("aria-invalid", msg ? "true" : "false"); if (msg) ok = false; }
      if (join) err("username", form.username.value.trim().length >= 3 ? "" : "At least 3 characters.");
      err("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim()) ? "" : "Enter a valid email.");
      err("password", form.password.value.length >= 7 ? "" : "At least 7 characters.");
      if (join) {
        var terms = form.querySelector("[data-terms]");
        if (terms && !terms.checked) { var lbl = form.querySelector(".auth__terms"); if (lbl) lbl.classList.add("is-err"); ok = false; }
        else { var lbl2 = form.querySelector(".auth__terms"); if (lbl2) lbl2.classList.remove("is-err"); }
      }
      if (ok) { closeModal(); toast(join ? "Welcome to SatoshiSpin. Your balance is ready." : "Logged in. Good luck!"); }
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
    renderWins();
    renderProviders();
    renderBets();
    renderFooterCoins();
    initChat();
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

      var navToggle = t.closest("[data-nav-toggle]");
      if (navToggle) {
        if (window.matchMedia("(min-width: 1025px)").matches) {
          var appEl = document.querySelector(".app");
          var collapsed = appEl.classList.toggle("nav-collapsed");
          navToggle.setAttribute("aria-expanded", String(!collapsed));
          navToggle.setAttribute("aria-label", collapsed ? "Expand menu" : "Collapse menu");
        } else { closeDrawer(); }
        return;
      }

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

      var pscroll = t.closest("[data-pscroll]");
      if (pscroll) { var pt = $("#providersTrack"); if (pt) pt.scrollBy({ left: (pscroll.getAttribute("data-pscroll") === "next" ? 1 : -1) * Math.round(pt.clientWidth * 0.85), behavior: REDUCE ? "auto" : "smooth" }); return; }

      var prov = t.closest(".provider[data-provider]");
      if (prov) { toast(prov.getAttribute("data-provider") + " — provider lobby coming soon."); return; }

      var verify = t.closest("[data-verify]");
      if (verify) { e.preventDefault(); toast("Replace the placeholder licence details with your registered Curaçao licence and verification link."); return; }

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
