// Vargas Arts shared page helpers
(function() {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function() {
    loadSharedNavbarCss();
    loadMuseumModePolish();
    enhancePagePerformance();
    enhanceSalesPageDesign();
    addExternalLinkSafety();
  });

  function loadSharedNavbarCss() {
    var alreadyLoaded = Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'), function(link) {
      return (link.getAttribute("href") || "").indexOf("vargas-nav.css") !== -1;
    });

    if (alreadyLoaded) {
      return;
    }

    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "./assets/css/vargas-nav.css?v=nav-system-6";
    document.head.appendChild(css);
  }

  function loadMuseumModePolish() {
    var hasGalleryModal = !!document.getElementById("myModal-fix");

    if (!hasGalleryModal) {
      return;
    }

    var alreadyLoaded = Array.prototype.some.call(document.querySelectorAll("script[src]"), function(script) {
      return (script.getAttribute("src") || "").indexOf("museum-polish.js") !== -1;
    });

    if (alreadyLoaded) {
      return;
    }

    var script = document.createElement("script");
    script.src = "./assets/js/museum-polish.js?v=museum-polish-1";
    script.defer = true;
    document.body.appendChild(script);
  }

  function enhancePagePerformance() {
    var images = document.querySelectorAll("img");

    images.forEach(function(image) {
      if (!image.hasAttribute("loading") && !image.closest(".hero")) {
        image.setAttribute("loading", "lazy");
      }

      if (!image.hasAttribute("decoding")) {
        image.setAttribute("decoding", "async");
      }
    });
  }

  function enhanceSalesPageDesign() {
    var isSalesPage = /sales\.html?$|\/sales\/?$/i.test(window.location.pathname);

    if (!isSalesPage) {
      return;
    }

    document.body.classList.add("sales-page-modern");

    if (document.querySelector('link[href="./assets/css/sales-modern.css"]')) {
      return;
    }

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./assets/css/sales-modern.css";
    document.head.appendChild(link);
  }

  function addExternalLinkSafety() {
    document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
      var rel = (link.getAttribute("rel") || "").toLowerCase().split(/\s+/);

      ["noopener", "noreferrer"].forEach(function(token) {
        if (rel.indexOf(token) === -1) {
          rel.push(token);
        }
      });

      link.setAttribute("rel", rel.join(" ").trim());
    });
  }
})();
