const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");
const menuToggle = document.querySelector(".menu-toggle");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

navLinkItems.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        event.preventDefault();

        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("is-open");
});

window.addEventListener("scroll", () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.2
});

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        const activeId = entry.target.getAttribute("id");

        navLinkItems.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${activeId}`;
            link.classList.toggle("active", isActive);
        });
    });
}, {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0
});

sections.forEach((section) => sectionObserver.observe(section));
