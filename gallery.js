// ========== FILTER FUNCTIONALITY ==========
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Active button styling
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filterValue === "all" || filterValue === itemCategory) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 10);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.95)";
        setTimeout(() => {
          item.style.display = "none";
        }, 200);
      }
    });
  });
});

// ========== LIGHTBOX / POPUP ==========
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Create an array of all cards for navigation
const cards = Array.from(document.querySelectorAll(".gallery-card"));

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    const title = card.querySelector("h3")?.innerText || "";
    const text = card.querySelector("p")?.innerText || "";

    currentIndex = index;
    openLightbox(img.src, `${title} – ${text}`);
  });
});

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

lightboxClose.addEventListener("click", closeLightbox);

// Close on background click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Navigation buttons
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  const img = cards[currentIndex].querySelector("img");
  const title = cards[currentIndex].querySelector("h3")?.innerText || "";
  const text = cards[currentIndex].querySelector("p")?.innerText || "";
  openLightbox(img.src, `${title} – ${text}`);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % cards.length;
  const img = cards[currentIndex].querySelector("img");
  const title = cards[currentIndex].querySelector("h3")?.innerText || "";
  const text = cards[currentIndex].querySelector("p")?.innerText || "";
  openLightbox(img.src, `${title} – ${text}`);
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

// ========== SCROLL ANIMATION (FADE-UP) ==========
const fadeElems = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // ek baar animate karo, phir band
      }
    });
  },
  {
    threshold: 0.15,
  }
);

fadeElems.forEach((el) => observer.observe(el));
// Hero Slider
let slides = document.querySelectorAll('.hero .slide');
let currentSlide = 0;

function showSlide(index){
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if(i === index) slide.classList.add('active');
    });
}
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 8000);


// Cursor Effect
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});


// Sticky navbar
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    nav.classList.toggle("sticky-active", window.scrollY > 150);
});


// Logo Slider Infinite Loop
const track = document.getElementById("logoTrack");
const logos = track.innerHTML;
track.innerHTML += logos;


// Review Slider
window.onload = function () {
    const carousel = document.getElementById("carousel");
    const dotsContainer = document.getElementById("dots");

    let slides = document.querySelectorAll(".slide-row");
    let totalSlides = slides.length;
    let index = 0;

    for (let i = 0; i < totalSlides; i++) {
        let dot = document.createElement("div");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);

        dot.addEventListener("click", () => {
            index = i;
            updateCarousel();
        });
    }
    const dots = dotsContainer.querySelectorAll("div");

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    setInterval(() => {
        index = (index + 1) % totalSlides;
        updateCarousel();
    }, 4000);
};


const toggle=document.getElementById("navToggle");
const menu=document.getElementById("navMenu");
const overlay=document.getElementById("overlay");

toggle.onclick=()=>{
    menu.classList.toggle("show");
    overlay.classList.toggle("show");
};

overlay.onclick=()=>{
    menu.classList.remove("show");
    overlay.classList.remove("show");
};
