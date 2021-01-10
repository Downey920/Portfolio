"use strict";

const navbar = document.querySelector(".navBar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (navbarHeight < window.scrollY) {
    navbar.classList.add("navBar--dark");
  } else {
    navbar.classList.remove("navBar--dark");
  }
});
