const slidesContainer = document.querySelector('.slides');
const slideElems = document.querySelectorAll('.slide');
const totalSlides = slideElems.length;

const firstClone = slideElems[0].cloneNode(true);
const lastClone = slideElems[totalSlides - 1].cloneNode(true);

firstClone.classList.add('clone');
lastClone.classList.add('clone');

slidesContainer.appendChild(firstClone);
slidesContainer.insertBefore(lastClone, slideElems[0]);

const allSlides = document.querySelectorAll('.slide');
let currentIndex = 1;
let autoplay;
const slideInterval = 5000;

slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

function goToSlide(index) {
    slidesContainer.style.transition = 'transform 1s ease-in-out';
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
}

function nextSlide() {
    if (currentIndex >= allSlides.length - 1) return;
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    if (currentIndex <= 0) return;
    goToSlide(currentIndex - 1);
}

function startAutoplay() {
    autoplay = setInterval(() => {
        nextSlide();
    }, slideInterval);
}

function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
}

document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
});

document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
});

slidesContainer.addEventListener('transitionend', () => {
    if (allSlides[currentIndex].classList.contains('clone')) {
        slidesContainer.style.transition = 'none';
        if (currentIndex === allSlides.length - 1) {
            currentIndex = 1;
        } else if (currentIndex === 0) {
            currentIndex = totalSlides;
        }
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
});

startAutoplay();


const tabs = document.querySelectorAll(".tab-content");
const buttons = document.querySelectorAll(".tab-button");

const showProjectsBtn = document.getElementById("show-projects");
const showInternshipsBtn = document.getElementById("show-internships");
const showCertificationsBtn = document.getElementById("show-certifications");
const showFellowshipsBtn = document.getElementById("show-fellowships");

function showTab(tabClassName, activeButton) {
    tabs.forEach(tab => {
        tab.classList.remove("active");
    });
    document.querySelector(`.${tabClassName}`).classList.add("active");
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });
    activeButton.classList.add("active");
}

showProjectsBtn.addEventListener("click", () => {
    showTab("project-tab", showProjectsBtn);
});

showInternshipsBtn.addEventListener("click", () => {
    showTab("intern-tab", showInternshipsBtn);
});

showFellowshipsBtn.addEventListener("click", () => {
    showTab("fellow-tab", showFellowshipsBtn);
});

showCertificationsBtn.addEventListener("click", () => {
    showTab("cert-tab", showCertificationsBtn);
});


document.body.addEventListener('click', (e) => {
    if (e.target) {
        switch (e.target.id) {
            case "go-to-certifications":
                console.log("Slide button clicked: Certifications");
                showTab("cert-tab", showCertificationsBtn);
                break;
            case "go-to-fellowships":
                console.log("Slide button clicked: Fellowships");
                showTab("fellow-tab", showFellowshipsBtn);
                break;
            case "go-to-internships":
                console.log("Slide button clicked: Internships");
                showTab("intern-tab", showInternshipsBtn);
                break;
            case "go-to-projects":
                console.log("Slide button clicked: Projects");
                showTab("project-tab", showProjectsBtn);
                break;
        }
    }
});

document.getElementById('explore').addEventListener('change', function () {
    const val = this.value;

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

    if (val === 'coding-profiles') {
        document.getElementById('coding-profiles').scrollIntoView({ behavior: 'smooth' });
    } else {
        const tabs = document.querySelectorAll('#my-work .tab-content');
        tabs.forEach(tab => tab.classList.remove('active'));

        const targetSection = document.getElementById(val);
        if (targetSection) {
            const tabContent = targetSection.querySelector('.tab-content');
            if (tabContent) {
                tabContent.classList.add('active');
            }
            targetSection.scrollIntoView({ behavior: 'smooth' });

            if (val === 'my-work' || val === 'projects') {
                document.getElementById('show-projects').classList.add('active');
            } else if (val === 'cert') {
                document.getElementById('show-certifications').classList.add('active');
            } else if (val === 'fellow') {
                document.getElementById('show-fellowships').classList.add('active');
            } else if (val === 'intern') {
                document.getElementById('show-internships').classList.add('active');
            }
        }
    }
});


const exploreSelect = document.getElementById('explore');

document.querySelectorAll('.nav-link, .nav-button').forEach(link => {
    link.addEventListener('click', () => {
        exploreSelect.selectedIndex = 0;
        exploreSelect.style.backgroundColor = 'black';
        exploreSelect.style.color = 'white';
    });
});

window.addEventListener('load', function () {
    window.location.hash = "#home";
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const exploreSelect = document.getElementById("explore");
    const navLinks = document.querySelectorAll(".nav-link, .nav-button");

    let isMenuOpen = false;


    hamburgerBtn.addEventListener("click", () => {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
        hamburgerBtn.textContent = isMenuOpen ? "✖" : "☰";
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (isMenuOpen) {
                closeMenu();
            }
        });
    });

    exploreSelect.addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });

    exploreSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        if (value) {
            const target = document.getElementById(value);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            } else {
                window.location.hash = value;
            }
            exploreSelect.selectedIndex = 0;
            if (isMenuOpen) {
                closeMenu();
            }
        }
    });

    function closeMenu() {
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
        hamburgerBtn.textContent = "☰";
        isMenuOpen = false;
    }
});
