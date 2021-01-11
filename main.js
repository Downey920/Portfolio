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
  scrollIntoView(link);
});

// Handle scrolling when tapping on the contactBtn
const homeBtn = document.querySelector(".home__btn");
homeBtn.addEventListener("click", event => {
  scrollIntoView(".contact");
});

// Make home slowly fade to transparent as the window scrolls down
const homeContainer = document.querySelector(".homeContainer");
const homeHeight = homeContainer.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down & Handle click on "arrow up"
const arrowBtn = document.querySelector(".arrowBtn");
arrowBtn.addEventListener("click", () => {
  scrollIntoView(".home");
});

document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowBtn.classList.add("visible");
  } else {
    arrowBtn.classList.remove("visible");
  }
});

//My work filtering
const categories = document.querySelector(".myWork__categories");
const projectContainer = document.querySelector(".myWork__projects");
const projects = document.querySelectorAll(".project");
categories.addEventListener("click", event => {
  const target = event.target;
  const filter = target.dataset.filter || target.parentNode.dataset.filter;
  if (filter === undefined) {
    return;
  }

  projectContainer.classList.add("anim-out");

  setTimeout(() => {
    projects.forEach(project => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
