(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("#mobile-menu");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const storedTheme = localStorage.getItem("artex-research-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.dataset.theme = storedTheme;
  }

  const syncThemeButton = () => {
    if (!themeToggle) return;
    const light = root.dataset.theme === "light";
    themeToggle.setAttribute(
      "aria-label",
      light ? "Switch to dark theme" : "Switch to light theme"
    );
    themeToggle.setAttribute("aria-pressed", String(light));
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", light ? "#f7f7f8" : "#09090b");
  };

  syncThemeButton();

  themeToggle?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("artex-research-theme", root.dataset.theme);
    syncThemeButton();
  });

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mobileMenu.classList.remove("is-open");
  };

  menuToggle?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    mobileMenu.classList.toggle("is-open", !open);
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document
    .querySelectorAll('a[href^="https://artex.lol"]')
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (typeof window.gtag !== "function") return;
        const section = link.closest("section");
        window.gtag("event", "console_open", {
          link_text: (link.textContent || "").trim().replace(/\s+/g, " "),
          link_url: link.href,
          placement:
            section?.id || (link.closest(".site-header") ? "header" : "content"),
          transport_type: "beacon",
        });
      });
    });

  const revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
})();
