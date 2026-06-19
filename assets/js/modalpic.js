// Vargas Arts gallery modal controls - Luxury Modal V2

var slideIndex = 1;
var touchStartX = 0;
var touchStartY = 0;
var lastFocusedElement = null;

function getModal() {
  return document.getElementById("myModal-fix");
}

function getSlides() {
  return document.getElementsByClassName("mySlides");
}

function getCurrentSlide() {
  var slides = getSlides();
  return slides[slideIndex - 1] || null;
}

function getArtworkText(slide) {
  var label = slide ? slide.querySelector(".numbertext") : null;
  return label ? label.textContent.replace(/\s+/g, " ").trim() : "";
}

function parseArtworkText(text) {
  var clean = (text || "").replace(/[“”]/g, '"').trim();
  var quotedTitle = clean.match(/"([^"]+)"/);
  var title = quotedTitle ? quotedTitle[1] : clean.split(/\(|•|-/)[0].trim();
  var details = clean;

  if (quotedTitle) {
    details = clean.replace(quotedTitle[0], "").replace(/^\s*[:•-]?\s*/, "").trim();
  }

  return {
    title: title || "Artwork",
    details: details || "Original artwork by Ulises Vargas"
  };
}

function ensureMuseumModeStyles() {
  if (document.getElementById("va-museum-mode-styles")) {
    return;
  }

  var style = document.createElement("style");
  style.id = "va-museum-mode-styles";
  style.textContent = `
    #myModal-fix.is-museum-mode {
      padding: 0 !important;
      background: radial-gradient(circle at center, rgba(212, 175, 55, .08), transparent 44%), #000 !important;
      overflow: hidden !important;
    }

    #myModal-fix.is-museum-mode::before {
      opacity: .35 !important;
    }

    #myModal-fix.is-museum-mode .modal-content-fix {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      max-width: none !important;
      max-height: none !important;
      margin: 0 !important;
      padding: clamp(18px, 3vh, 34px) clamp(72px, 6vw, 110px) !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      transform: none !important;
      overflow: hidden !important;
    }

    #myModal-fix.is-museum-mode .va-modal-counter,
    #myModal-fix.is-museum-mode .numbertext,
    #myModal-fix.is-museum-mode .caption-container,
    #myModal-fix.is-museum-mode .va-modal-art-card,
    #myModal-fix.is-museum-mode .va-modal-sale-badge {
      display: none !important;
    }

    #myModal-fix.is-museum-mode .mySlides {
      width: 100% !important;
      height: 100% !important;
      min-height: 100% !important;
      overflow: visible !important;
      display: none;
    }

    #myModal-fix.is-museum-mode .mySlides[style*="block"] {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    #myModal-fix.is-museum-mode .pic-fit {
      width: auto !important;
      height: auto !important;
      max-width: 94vw !important;
      max-height: 94vh !important;
      max-height: 94dvh !important;
      object-fit: contain !important;
      border-radius: 10px !important;
      border: 1px solid rgba(243, 217, 121, .18) !important;
      background: #000 !important;
      box-shadow: 0 30px 90px rgba(0, 0, 0, .86), 0 0 46px rgba(212, 175, 55, .12) !important;
      cursor: zoom-in !important;
    }

    #myModal-fix.is-museum-mode .pic-fit.is-zoomed {
      max-width: none !important;
      max-height: none !important;
      transform: scale(1.22) !important;
      cursor: zoom-out !important;
    }

    #myModal-fix.is-museum-mode .prev,
    #myModal-fix.is-museum-mode .next {
      position: fixed !important;
      top: 50% !important;
      bottom: auto !important;
      left: auto !important;
      width: 58px !important;
      height: 58px !important;
      transform: translateY(-50%) !important;
      background: rgba(0, 0, 0, .52) !important;
      border-color: rgba(243, 217, 121, .46) !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      box-shadow: 0 18px 52px rgba(0, 0, 0, .68), 0 0 26px rgba(212, 175, 55, .14) !important;
    }

    #myModal-fix.is-museum-mode .prev {
      left: 28px !important;
      right: auto !important;
    }

    #myModal-fix.is-museum-mode .next {
      right: 28px !important;
      left: auto !important;
    }

    #myModal-fix.is-museum-mode .close {
      top: 18px !important;
      right: 18px !important;
      background: rgba(0, 0, 0, .58) !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
    }

    #myModal-fix.is-museum-mode .va-modal-loader {
      inset: 0 !important;
    }

    @media (max-width: 760px) {
      #myModal-fix.is-museum-mode .modal-content-fix {
        padding: calc(56px + env(safe-area-inset-top)) 10px calc(84px + env(safe-area-inset-bottom)) !important;
      }

      #myModal-fix.is-museum-mode .pic-fit {
        max-width: 96vw !important;
        max-height: calc(100dvh - 150px) !important;
        border-radius: 8px !important;
      }

      #myModal-fix.is-museum-mode .prev,
      #myModal-fix.is-museum-mode .next {
        top: auto !important;
        bottom: calc(22px + env(safe-area-inset-bottom)) !important;
        width: 50px !important;
        height: 50px !important;
        transform: none !important;
      }

      #myModal-fix.is-museum-mode .prev {
        left: calc(50% - 64px) !important;
      }

      #myModal-fix.is-museum-mode .next {
        right: calc(50% - 64px) !important;
      }
    }

    @media (max-width: 920px) and (orientation: landscape) {
      #myModal-fix.is-museum-mode .modal-content-fix {
        padding: 8px 72px 8px 10px !important;
      }

      #myModal-fix.is-museum-mode .pic-fit {
        max-width: calc(100vw - 100px) !important;
        max-height: calc(100dvh - 20px) !important;
      }

      #myModal-fix.is-museum-mode .prev,
      #myModal-fix.is-museum-mode .next {
        left: auto !important;
        right: 14px !important;
        width: 42px !important;
        height: 42px !important;
      }

      #myModal-fix.is-museum-mode .prev {
        top: calc(50% - 48px) !important;
        bottom: auto !important;
      }

      #myModal-fix.is-museum-mode .next {
        top: calc(50% + 8px) !important;
        bottom: auto !important;
      }
    }
  `;

  document.head.appendChild(style);
}

function getFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
}

function isModalFullscreen() {
  var modal = getModal();
  return !!(modal && (modal.classList.contains("is-museum-mode") || getFullscreenElement() === modal));
}

function updateFullscreenButton() {
  // Museum Mode is intentionally controlled by double-click and the F key only.
}

function enterMuseumMode() {
  var modal = getModal();

  if (!modal) {
    return;
  }

  ensureMuseumModeStyles();
  modal.classList.add("is-museum-mode");

  try {
    if (!getFullscreenElement()) {
      if (modal.requestFullscreen) {
        modal.requestFullscreen();
      } else if (modal.webkitRequestFullscreen) {
        modal.webkitRequestFullscreen();
      } else if (modal.msRequestFullscreen) {
        modal.msRequestFullscreen();
      }
    }
  } catch (err) {
    // Some mobile browsers block fullscreen unless it is triggered by a direct gesture.
  }
}

function exitMuseumMode() {
  var modal = getModal();

  if (modal) {
    modal.classList.remove("is-museum-mode");
  }

  try {
    if (getFullscreenElement()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  } catch (err) {
    // Ignore browser fullscreen API errors and keep class cleanup safe.
  }
}

function toggleMuseumMode() {
  if (isModalFullscreen()) {
    exitMuseumMode();
  } else {
    enterMuseumMode();
  }
}

function ensureModalUI() {
  var modal = getModal();
  var content = modal ? modal.querySelector(".modal-content-fix") : null;

  if (!modal || !content) {
    return;
  }

  ensureMuseumModeStyles();

  var oldFullscreenButton = modal.querySelector(".va-modal-fullscreen");
  if (oldFullscreenButton) {
    oldFullscreenButton.remove();
  }

  if (!content.querySelector(".va-modal-counter")) {
    var counter = document.createElement("div");
    counter.className = "va-modal-counter";
    counter.setAttribute("aria-live", "polite");
    content.insertBefore(counter, content.firstChild);
  }

  if (!content.querySelector(".va-modal-loader")) {
    var loader = document.createElement("div");
    loader.className = "va-modal-loader";
    loader.setAttribute("aria-hidden", "true");
    loader.style.display = "none";
    loader.innerHTML = '<span></span><p>Loading artwork</p>';
    content.appendChild(loader);
  }

  if (!content.querySelector(".va-modal-art-card")) {
    var card = document.createElement("div");
    card.className = "va-modal-art-card";
    card.innerHTML = '<div class="va-modal-art-main"><div class="va-modal-art-eyebrow">Vargas Arts Gallery</div><h2 class="va-modal-art-title">Artwork</h2><p class="va-modal-art-details"></p></div><div class="va-modal-sale-badge" hidden>Available</div>';
    content.appendChild(card);
  }

  var images = content.querySelectorAll(".mySlides img");
  for (var i = 0; i < images.length; i++) {
    if (!images[i].getAttribute("data-zoom-ready")) {
      images[i].setAttribute("data-zoom-ready", "true");
      images[i].setAttribute("title", "Click to zoom. Double-click for museum view.");
      images[i].addEventListener("click", function(e) {
        e.stopPropagation();
        this.classList.toggle("is-zoomed");
      });
      images[i].addEventListener("dblclick", function(e) {
        e.preventDefault();
        e.stopPropagation();
        resetZoom();
        toggleMuseumMode();
      });
    }
  }
}

function setLoadingState(isLoading) {
  var modal = getModal();
  var content = modal ? modal.querySelector(".modal-content-fix") : null;
  var loader = content ? content.querySelector(".va-modal-loader") : null;

  if (!content) {
    return;
  }

  if (isLoading) {
    content.classList.add("is-loading-artwork");
    if (loader) loader.style.display = "flex";
  } else {
    content.classList.remove("is-loading-artwork");
    if (loader) loader.style.display = "none";
  }
}

function prepareImageReveal(slide) {
  var img = slide ? slide.querySelector("img") : null;

  if (!img) {
    setLoadingState(false);
    return;
  }

  if (img.complete && img.naturalWidth > 0) {
    img.classList.add("is-loaded");
    setLoadingState(false);
    return;
  }

  img.classList.remove("is-loaded");
  setLoadingState(true);

  img.onload = function() {
    img.classList.add("is-loaded");
    setLoadingState(false);
  };

  img.onerror = function() {
    img.classList.add("is-loaded");
    setLoadingState(false);
  };
}

function updateModalUI() {
  var modal = getModal();
  var slides = getSlides();
  var current = getCurrentSlide();
  var content = modal ? modal.querySelector(".modal-content-fix") : null;

  if (!modal || !content || !slides.length || !current) {
    return;
  }

  var parsed = parseArtworkText(getArtworkText(current));
  var counter = content.querySelector(".va-modal-counter");
  var title = content.querySelector(".va-modal-art-title");
  var details = content.querySelector(".va-modal-art-details");
  var badge = content.querySelector(".va-modal-sale-badge");
  var salePage = /sales\.html?$|\/sales\/?$/i.test(window.location.pathname);

  if (counter) counter.textContent = "Artwork " + slideIndex + " of " + slides.length;
  if (title) title.textContent = parsed.title;
  if (details) details.textContent = parsed.details;

  if (badge) {
    badge.hidden = !salePage;
    badge.textContent = "Available";
  }
}

function resetZoom() {
  var zoomed = document.querySelectorAll("#myModal-fix .pic-fit.is-zoomed");
  for (var i = 0; i < zoomed.length; i++) {
    zoomed[i].classList.remove("is-zoomed");
  }
}

function preloadNearbyImages() {
  var slides = getSlides();
  if (!slides.length) return;

  [slideIndex - 1, slideIndex, slideIndex - 2].forEach(function(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    var img = slides[index].querySelector("img");
    if (img && img.src) {
      var preload = document.createElement("img");
      preload.src = img.src;
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  ensureModalUI();
  showSlides(slideIndex);
  preloadNearbyImages();
});

function openModal() {
  var modal = getModal();
  if (!modal) return;

  ensureModalUI();
  lastFocusedElement = document.activeElement;
  modal.style.display = "block";
  document.body.classList.add("modal-open-fix");

  window.requestAnimationFrame(function() {
    modal.classList.add("is-open");
  });
}

function closeModal() {
  var modal = getModal();
  if (!modal) return;

  resetZoom();
  exitMuseumMode();
  setLoadingState(false);
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open-fix");

  window.setTimeout(function() {
    if (!modal.classList.contains("is-open")) {
      modal.style.display = "none";
    }
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }, 260);
}

function plusSlides(n) {
  resetZoom();
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  resetZoom();
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = getSlides();
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");

  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    dots[i].className = dots[i].className.replace("active", "");
  }

  slides[slideIndex - 1].style.display = "block";

  if (dots.length && dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
    if (captionText) captionText.innerHTML = dots[slideIndex - 1].alt || "";
  } else if (captionText) {
    captionText.innerHTML = "";
  }

  updateModalUI();
  prepareImageReveal(slides[slideIndex - 1]);
  preloadNearbyImages();
}

document.addEventListener("keydown", function(e) {
  var modal = getModal();
  if (!modal || !modal.classList.contains("is-open")) return;

  if (e.key === "Escape") {
    if (isModalFullscreen()) {
      exitMuseumMode();
    } else {
      closeModal();
    }
  }
  if (e.key === "ArrowLeft") plusSlides(-1);
  if (e.key === "ArrowRight") plusSlides(1);
  if (e.key && e.key.toLowerCase() === "f") {
    resetZoom();
    toggleMuseumMode();
  }
});

document.addEventListener("fullscreenchange", function() {
  var modal = getModal();
  if (modal && !getFullscreenElement()) {
    modal.classList.remove("is-museum-mode");
  }
});

document.addEventListener("webkitfullscreenchange", function() {
  var modal = getModal();
  if (modal && !getFullscreenElement()) {
    modal.classList.remove("is-museum-mode");
  }
});

document.addEventListener("click", function(e) {
  var modal = getModal();
  if (!modal || !modal.classList.contains("is-open")) return;
  if (e.target === modal) closeModal();
});

document.addEventListener("touchstart", function(e) {
  var modal = getModal();
  if (!modal || !modal.classList.contains("is-open") || !e.changedTouches.length) return;
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener("touchend", function(e) {
  var modal = getModal();
  if (!modal || !modal.classList.contains("is-open") || !e.changedTouches.length) return;

  var distanceX = e.changedTouches[0].screenX - touchStartX;
  var distanceY = e.changedTouches[0].screenY - touchStartY;

  if (Math.abs(distanceX) > 55 && Math.abs(distanceX) > Math.abs(distanceY) * 1.25) {
    plusSlides(distanceX < 0 ? 1 : -1);
  }
}, { passive: true });
