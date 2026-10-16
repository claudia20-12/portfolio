// DATI DEI PROGETTI

const progetti = {
  illustrazione: {
    numero: "PROGETTO 01",
    titolo: "Illustrazione",
    breve: "Ricerca personale e narrazione visiva.",
    testo: "Un progetto dedicato alla ricerca di un linguaggio visivo personale. Qui potrai raccontare l'idea iniziale, il significato dell'illustrazione e le scelte che hanno guidato il lavoro.",
    tecniche: "Tecniche e strumenti: da definire.",
    colore: "#e8d8ca",
    immagine: "img/illustrazione.jpg",
    alt: "Illustrazione selezionata dal portfolio"
  },

  identita: {
    numero: "PROGETTO 02",
    titolo: "Identità visiva",
    breve: "Progetti di graphic design e branding.",
    testo: "Un progetto di comunicazione visiva in cui raccontare il contesto, il pubblico di riferimento e il percorso che ti ha portato a definire l'identità del brand.",
    tecniche: "Tecniche e strumenti: da definire.",
    colore: "#d9dfd0",
    immagine: "img/identita-visiva.jpg",
    alt: "Progetto di identità visiva e branding"
  },

  "art-direction": {
    numero: "PROGETTO 03",
    titolo: "Art direction",
    breve: "Concept e sistemi di comunicazione.",
    testo: "Uno spazio per presentare il concept creativo, la ricerca visiva e le decisioni progettuali che hanno dato forma al sistema di comunicazione.",
    tecniche: "Tecniche e strumenti: da definire.",
    colore: "#e8c4bf",
    immagine: "img/art-direction.jpg",
    alt: "Progetto di art direction e comunicazione visiva"
  }
};


// MOSTRA IL PROGETTO SELEZIONATO

const paginaProgetto = document.querySelector(".pagina-progetto");

if (paginaProgetto) {
  const parametri = new URLSearchParams(window.location.search);
  const idProgetto = parametri.get("id");
  const progetto = progetti[idProgetto];

  if (progetto) {
    document.title = progetto.titolo + " | Portfolio creativo";

    document.querySelector("#numero-progetto").textContent =
      progetto.numero;

    document.querySelector("#titolo-progetto").textContent =
      progetto.titolo;

    document.querySelector("#descrizione-breve").textContent =
      progetto.breve;

    document.querySelector("#testo-progetto").textContent =
      progetto.testo;

    document.querySelector("#tecniche-progetto").textContent =
      progetto.tecniche;

    const contenitoreImmagine =
      document.querySelector("#immagine-progetto");

    contenitoreImmagine.style.backgroundColor = progetto.colore;

    const immagine = document.querySelector("#immagine-progetto-img");

    if (immagine) {
      immagine.src = progetto.immagine;
      immagine.alt = progetto.alt;

      immagine.onerror = function () {
        this.style.display = "none";
      };
    }
  } else {
    document.title = "Progetto non trovato | Portfolio creativo";

    document.querySelector("#numero-progetto").textContent =
      "PORTFOLIO";

    document.querySelector("#titolo-progetto").textContent =
      "Progetto non trovato";

    document.querySelector("#descrizione-breve").textContent =
      "Torna alla selezione per scegliere un progetto.";

    document.querySelector("#testo-progetto").textContent =
      "Questo collegamento non corrisponde a un progetto disponibile.";

    document.querySelector("#tecniche-progetto").textContent = "";

    const immagine = document.querySelector("#immagine-progetto-img");

    if (immagine) {
      immagine.style.display = "none";
    }
  }
}


// COMPARSA GRADUALE DEGLI ELEMENTI

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.body.classList.add("js-animazioni");

  const elementi = document.querySelectorAll(
    "main section, .progetto-link"
  );

  elementi.forEach(function (elemento) {
    elemento.classList.add("animabile");
  });

  const osservatore = new IntersectionObserver(
    function (elementiOsservati, osservatore) {
      elementiOsservati.forEach(function (elemento) {
        if (elemento.isIntersecting) {
          elemento.target.classList.add("visibile");
          osservatore.unobserve(elemento.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  elementi.forEach(function (elemento) {
    osservatore.observe(elemento);
  });
}


// CURSORE CREATIVO ROSSO

const usaCursoreCreativo =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (usaCursoreCreativo) {
  const cursore = document.createElement("div");

  cursore.classList.add("cursore-creativo");
  cursore.setAttribute("aria-hidden", "true");

  document.body.appendChild(cursore);
  document.body.classList.add("cursore-attivo");

  // Segue il movimento del mouse
  document.addEventListener("mousemove", function (evento) {
    cursore.style.left = evento.clientX + "px";
    cursore.style.top = evento.clientY + "px";
    cursore.classList.add("visibile");
  });

  // Si nasconde quando il mouse esce dalla finestra
  document.addEventListener("mouseout", function (evento) {
    if (!evento.relatedTarget) {
      cursore.classList.remove("visibile");
    }
  });

  // Si ingrandisce sopra link e pulsanti
  document.querySelectorAll("a, button").forEach(function (elemento) {
    elemento.addEventListener("mouseenter", function () {
      cursore.classList.add("attivo");
    });

    elemento.addEventListener("mouseleave", function () {
      cursore.classList.remove("attivo");
    });
  });
}








/* ========================================
   CAROSELLO GALLERIA
   ======================================== */

document.querySelectorAll(".carosello-contenitore").forEach((carosello) => {
  const galleria = carosello.querySelector(".carosello-track");
  const precedente = carosello.querySelector(".carosello-precedente");
  const successivo = carosello.querySelector(".carosello-successivo");

  if (!galleria || !precedente || !successivo) {
    return;
  }

  precedente.addEventListener("click", () => {
    galleria.scrollBy({
      left: -galleria.clientWidth * 0.8,
      behavior: "smooth"
    });
  });

  successivo.addEventListener("click", () => {
    galleria.scrollBy({
      left: galleria.clientWidth * 0.8,
      behavior: "smooth"
    });
  });
});




/* ========================================
   CHI SONO — FLIP DELL'ILLUSTRAZIONE
   ======================================== */

document.querySelectorAll(".opera-flip").forEach((opera) => {
  opera.addEventListener("click", () => {
    const girata = opera.classList.toggle("girata");

    opera.setAttribute("aria-pressed", String(girata));

    opera.setAttribute(
      "aria-label",
      girata
        ? "Torna all'illustrazione"
        : "Scopri la storia dell'illustrazione"
    );
  });
});
