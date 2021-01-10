"use strict";

// Make navbar transparent when it is on the top
const navbar = document.querySelector(".navBar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (navbarHeight < window.scrollY) {
    navbar.classList.add("navBar--dark");
  } else {
    navbar.classList.remove("navBar--dark");
  }
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navBar__toggleBtn");
const navbarMenu = document.querySelector(".navBar__menu");
navbarToggleBtn.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

// Handle scrolling when tapping on the navbar menu
navbarMenu.addEventListener("click", event => {
  const target = event.target;
  const link = target.dataset.link;

  if (link === undefined) {
    return;
  }

  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
});
