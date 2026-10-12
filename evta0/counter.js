// Lightweight view counter via busuanzi (https-only JSONP).
// Replaces the official busuanzi.pure.mini.js, whose protocol-relative
// JSONP request can hang on plain-http pages (e.g. local preview servers).
(function () {
  "use strict";
  var callback = "bszCallback" + Date.now();
  window[callback] = function (data) {
    var fill = function (id, value) {
      var el = document.getElementById(id);
      if (el && value !== undefined) { el.textContent = value; }
    };
    fill("busuanzi_value_page_pv", data.page_pv);
    fill("busuanzi_value_site_pv", data.site_pv);
    fill("busuanzi_value_site_uv", data.site_uv);
    ["busuanzi_container_page_pv", "busuanzi_container_site_pv", "busuanzi_container_site_uv"]
      .forEach(function (id) {
        var el = document.getElementById(id);
        if (el) { el.style.display = ""; }
      });
    try { delete window[callback]; } catch (e) { window[callback] = undefined; }
  };
  var s = document.createElement("script");
  s.src = "https://busuanzi.ibruce.info/busuanzi?jsonpCallback=" + callback;
  s.onerror = function () { /* counter stays hidden on failure */ };
  (document.head || document.documentElement).appendChild(s);
})();
