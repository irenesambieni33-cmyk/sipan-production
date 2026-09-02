document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MENU MOBILE
  ========================= */

  const menuToggle =
    document.querySelector(".menu-toggle") ||
    document.querySelector(".menu");

  const mainNav =
    document.querySelector(".main-nav") ||
    document.querySelector("#nav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    /* Fermer le menu après avoir cliqué sur un lien */

    mainNav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Ouvrir le menu"
        );
      });

    });
  }


  /* =========================
     COMMANDES WHATSAPP
  ========================= */

  const whatsappButtons =
    document.querySelectorAll(".whatsapp-order");

  whatsappButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const product =
        button.dataset.product || "un produit";

      const message =
        `Bonjour AGROTRIA 👋%0A%0A` +
        `Je souhaite avoir des informations concernant : ${product}.%0A%0A` +
        `Merci.`;

      const whatsappUrl =
        `https://wa.me/2290147544702?text=${message}`;

      window.open(whatsappUrl, "_blank");
    });

  });


  /* =========================
     ANNÉE AUTOMATIQUE
  ========================= */

  const yearElements =
    document.querySelectorAll(".current-year");

  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });


  /* =========================
     SERVICE WORKER / PWA
  ========================= */

  if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

      navigator.serviceWorker
        .register("./service-worker.js")

        .then((registration) => {

          console.log(
            "AGROTRIA : Service Worker enregistré.",
            registration.scope
          );

        })

        .catch((error) => {

          console.error(
            "AGROTRIA : erreur lors de l'enregistrement du Service Worker.",
            error
          );

        });

    });

  }

});