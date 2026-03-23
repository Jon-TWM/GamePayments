(function (global) {
  function getElement(id) {
    return id ? document.getElementById(id) : null;
  }

  function setupPopup(options) {
    var opts = options || {};
    var trigger = getElement(opts.triggerId);
    var overlay = getElement(opts.overlayId);
    var close = getElement(opts.closeId);
    var ok = getElement(opts.okId);
    var returnFocusToTrigger = opts.returnFocusToTrigger !== false;

    if (!overlay) return null;

    function openPopup(e) {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      if (close) close.focus();
      if (typeof opts.onOpen === "function") opts.onOpen();
    }

    function closePopup() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      if (returnFocusToTrigger && trigger) trigger.focus();
      if (typeof opts.onClose === "function") opts.onClose();
    }

    if (trigger) {
      trigger.addEventListener("click", openPopup);
    }
    if (close) {
      close.addEventListener("click", closePopup);
    }
    if (ok) {
      ok.addEventListener("click", closePopup);
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePopup();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        closePopup();
      }
    });

    return {
      open: openPopup,
      close: closePopup,
    };
  }

  global.PopupUtils = {
    setupPopup: setupPopup,
  };
})(window);
