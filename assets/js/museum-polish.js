// Vargas Arts Museum Mode polish
// Final viewing rules: museum view keeps navigation available by keyboard/swipe,
// hides visual arrows, and disables single-click zoom so the artwork stays clean.

(function () {
  function installMuseumPolish() {
    if (document.getElementById('va-museum-polish-styles')) return;

    var style = document.createElement('style');
    style.id = 'va-museum-polish-styles';
    style.textContent = `
      html body #myModal-fix .pic-fit,
      html body #myModal-fix.is-museum-mode .pic-fit {
        cursor: default !important;
      }

      html body #myModal-fix .pic-fit.is-zoomed,
      html body #myModal-fix.is-museum-mode .pic-fit.is-zoomed {
        transform: scale(1) !important;
        cursor: default !important;
      }

      html body #myModal-fix.is-museum-mode .modal-content-fix {
        padding: clamp(8px, 1.4vh, 18px) clamp(54px, 4vw, 74px) !important;
      }

      html body #myModal-fix.is-museum-mode .pic-fit {
        max-width: 98vw !important;
        max-height: 98vh !important;
        max-height: 98dvh !important;
        border-radius: 8px !important;
      }

      html body #myModal-fix.is-museum-mode .prev,
      html body #myModal-fix.is-museum-mode .next {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      html body #myModal-fix.is-museum-mode .close {
        width: 40px !important;
        height: 40px !important;
        top: 14px !important;
        right: 14px !important;
        font-size: 26px !important;
        opacity: .86 !important;
      }

      @media (max-width: 760px) {
        html body #myModal-fix.is-museum-mode .modal-content-fix {
          padding: calc(52px + env(safe-area-inset-top)) 8px calc(20px + env(safe-area-inset-bottom)) !important;
        }

        html body #myModal-fix.is-museum-mode .pic-fit {
          max-width: 98vw !important;
          max-height: calc(100dvh - 82px) !important;
        }
      }

      @media (max-width: 920px) and (orientation: landscape) {
        html body #myModal-fix.is-museum-mode .modal-content-fix {
          padding: 6px 8px !important;
        }

        html body #myModal-fix.is-museum-mode .pic-fit {
          max-width: calc(100vw - 16px) !important;
          max-height: calc(100dvh - 12px) !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function disableClickZoom() {
    document.addEventListener('click', function (event) {
      var image = event.target && event.target.closest ? event.target.closest('#myModal-fix .pic-fit') : null;

      if (!image) return;

      // Stop the older modal click-to-zoom listener from running.
      event.preventDefault();
      event.stopImmediatePropagation();
      image.classList.remove('is-zoomed');
    }, true);
  }

  function keepZoomOff() {
    var modal = document.getElementById('myModal-fix');
    if (!modal || !window.MutationObserver) return;

    var observer = new MutationObserver(function () {
      modal.querySelectorAll('.pic-fit.is-zoomed').forEach(function (image) {
        image.classList.remove('is-zoomed');
      });
    });

    observer.observe(modal, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  installMuseumPolish();
  disableClickZoom();
  document.addEventListener('DOMContentLoaded', function () {
    installMuseumPolish();
    keepZoomOff();
  });
})();
