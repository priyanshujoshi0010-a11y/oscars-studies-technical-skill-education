// ⭐ IMPORTANT: PASTE YOUR GOOGLE WEB APP URL HERE
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwd5W0pIMdTBEAR1tAy2NH9XFx2hq13-3CCw_-NhAh34O-OSEgzBNntzxzI4RowEfCy/exec";

// =============== VERIFY PAGE ===============
function verifyNow() {
    let roll = document.getElementById("roll").value;
    let cert = document.getElementById("cert").value;

    if (!roll || !cert) {
        alert("Enter Roll & Certificate Number");
        return;
    }

    let url = `${WEB_APP_URL}?roll=${roll}&cert=${cert}&callback=processResult`;

    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}

// =============== CALLBACK ===============
function processResult(res) {
    if (!window.location.href.includes("result.html")) {
        localStorage.setItem("verify_data", JSON.stringify(res));
        window.location.href = "result.html";
        return;
    }

    showResult(res);
}


// ⭐⭐ AUTO-CONVERT GOOGLE DRIVE URL TO DIRECT IMAGE LINK ⭐⭐
function convertDriveLink(link) {
    if (!link) return "";

    let fileId = "";

    // Pattern 1: /d/FILEID/
    if (link.includes("/d/")) {
        fileId = link.split("/d/")[1].split("/")[0];
    }

    // Pattern 2: ?id=FILEID
    else if (link.includes("id=")) {
        fileId = link.split("id=")[1];
    }

    if (!fileId) return link; // If no ID found, return original

    return `https://drive.google.com/uc?export=view&id=${fileId}`;
}


// =============== BUTTON PHOTO LOADER (OPTIONAL) ===============
function loadPhoto() {
    let link = document.getElementById("photoInput").value.trim();
    document.getElementById("studentPhoto").src = convertDriveLink(link);
}


// =============== RESULT PAGE DISPLAY ===============
function showResult(res) {

    // If not found
    if (!res.found) {
        document.querySelector(".result-container").innerHTML = `
            <div style="padding:25px; text-align:center; color:#black; font-size:20px;">
                ❌ No Record Found<br><br>
                Please check Roll Number & Certificate Number.
            </div>
        `;
        return;
    }

    let d = res.data;

    // ==== FILL ID CARD ELEMENTS ====

    // Student Name
    document.getElementById("studentName").innerText = d.Name || "N/A";

    // ⭐ Google Drive Photo Auto Convert ⭐
    if (d.Photo) {
        document.getElementById("studentPhoto").src = convertDriveLink(d.Photo);
    } else {
        document.getElementById("studentPhoto").src = "default-photo.jpg";
    }

    // Other details
    document.getElementById("rollNo").innerText = d.Roll || "N/A";
    document.getElementById("certNo").innerText = d.CertificateNo || "N/A";
    document.getElementById("fatherName").innerText = d.FatherName || "N/A";
    document.getElementById("course").innerText = d.Course || "N/A";
    document.getElementById("duration").innerText = d.Duration || "N/A";
    document.getElementById("grade").innerText = d.Grade || "N/A";
    document.getElementById("issueDate").innerText = d.IssueDate || "N/A";
    document.getElementById("centerName").innerText = d.CenterName || "N/A";
}

// =============== AUTO LOAD ON RESULT PAGE ===============
if (window.location.href.includes("result.html")) {
    let saved = localStorage.getItem("verify_data");
    if (saved) showResult(JSON.parse(saved));
}



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


const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

toggle.onclick = () => {
    menu.classList.toggle("show");
    overlay.classList.toggle("show");
};

overlay.onclick = () => {
    menu.classList.remove("show");
    overlay.classList.remove("show");
};
