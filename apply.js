document.getElementById("applyForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let institute = document.getElementById("institute").value;
    let director = document.getElementById("director").value;
    let mobile = document.getElementById("mobile").value;
    let space = document.getElementById("space").value;
    let labs = document.getElementById("labs").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let address = document.getElementById("address").value;
    let message = document.getElementById("message").value;

    let whatsappMsg = 
`*📩 New Franchise Application Received*

| *Field* | *Details* |
|--------|-----------|
| Institute Name | ${institute} |
| Director Name | ${director} |
| Mobile No. | ${mobile} |
| Space Available | ${space} |
| Lab Rooms | ${labs} |
| City | ${city} |
| State | ${state} |
| Address | ${address} |
| Message | ${message} |
`;

    let phoneNumber = "918219658586"; // 👉 fill your contact details 

    let url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(whatsappMsg);

    window.open(url, "_blank");
});
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



