document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------
     Simple testimonial slider
     ----------------------------------------- */

  const testimonials = [
  "Marcihoz járok a kezdetektől fogva a golden doodle kutyámmal. Annyira szépen van mindig nyírva Manny, hogy sokszor megállítanak az utcán megdicsérni vagy ajánlást kérni. Menny Marcink hála sosem félt, nagyon szeret hozzá járni! Csak ajánlani tudom!",
  "Marci türelmes és gyönyörűen rendbe teszi kutyusunk kezelhetetlen bundáját. Ajánlom mindenkinek!",
  "Szuper szakember, ért a kutyák nyelvén, csak ajánlani tudom ❤️",
  "Marci nem rég költözött ide és nyitotta meg kozmetikajat de mar 5 éve hozza járulunk folyamatosan. Nagyon alapos és rugalmas és jól bánik a kutyákkal. Szuper választás ☺️"
];

const testimonialCard = document.querySelector(".testimonial-card");
const testimonialText = testimonialCard.querySelector("p");
const prevTestimonial = document.querySelector(".slider-arrow.prev");
const nextTestimonial = document.querySelector(".slider-arrow.next");

let testimonialIndex = 0;

function setTestimonialHeight() {
  // Ideiglenesen eltávolítjuk a magasságkorlátozást
  testimonialCard.style.height = "auto";

  let maxHeight = 0;

  testimonials.forEach(text => {
    testimonialText.textContent = text;

    maxHeight = Math.max(
      maxHeight,
      testimonialCard.scrollHeight
    );
  });

  testimonialCard.style.height = `${maxHeight}px`;

  // Vissza az aktuális véleményhez
  testimonialText.textContent = testimonials[testimonialIndex];
}

function showTestimonial(index) {
  testimonialIndex =
    (index + testimonials.length) % testimonials.length;

  testimonialText.textContent =
    testimonials[testimonialIndex];
}

prevTestimonial.addEventListener("click", () => {
  showTestimonial(testimonialIndex - 1);
});

nextTestimonial.addEventListener("click", () => {
  showTestimonial(testimonialIndex + 1);
});

window.addEventListener("load", setTestimonialHeight);
window.addEventListener("resize", setTestimonialHeight);

  /* -----------------------------------------
     Gallery lightbox
     ----------------------------------------- */

  const galleryLinks = [...document.querySelectorAll('[data-gallery="dogs"]')];
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.querySelector(".modal-close");
  const prevImage = document.querySelector(".modal-prev");
  const nextImage = document.querySelector(".modal-next");

  let galleryIndex = 0;

  function showImage(index) {
    galleryIndex = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[galleryIndex];
    modalImage.src = link.href;
    modalImage.alt = link.querySelector("img").alt;
  }

  function openGallery(index) {
    showImage(index);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGallery() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openGallery(index);
    });
  });

  closeModal.addEventListener("click", closeGallery);

  prevImage.addEventListener("click", () => {
    showImage(galleryIndex - 1);
  });

  nextImage.addEventListener("click", () => {
    showImage(galleryIndex + 1);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeGallery();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "ArrowLeft") {
      showImage(galleryIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(galleryIndex + 1);
    }
  });
});