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
  navbar.classList.remove("open");
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

// Animation Elements on the Home Screen
addEventListener("load", () => {
  setTimeout(() => homeContainer.classList.add("show"), 300);
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

// My work filtering
const categories = document.querySelector(".myWork__categories");
const projectContainer = document.querySelector(".myWork__projects");
const projects = document.querySelectorAll(".project");
categories.addEventListener("click", event => {
  let target = event.target;
  const filter = target.dataset.filter || target.parentNode.dataset.filter;
  if (filter === undefined) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const activeBtn = document.querySelector(".categoryBtn.active");
  activeBtn.classList.remove("active");
  target = target.nodeName === "BUTTON" ? target : target.parentNode;

  target.classList.add("active");

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
  selectedItem(menuItems[menuItems.indexOf(selector)]);
}

// 1. 모든 섹션 요소들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionClass = [
  ".home",
  ".about",
  ".skills",
  ".myWork",
  ".testimonial",
  ".contact",
];
const menuItems = document.querySelectorAll(".menu__item");

const sections = sectionClass.map(section => {
  return document.querySelector(section);
});

let selectedNavItem = menuItems[0];
let selectedNavIndex = 0;

function selectedItem(selected) {
  if (selected === menuItems[1]) homeContainer.classList.remove("show");
  else if (selected === menuItems[0]) homeContainer.classList.add("show");

  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.boundingClientRect)
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        const index = sectionClass.indexOf(`.${entry.target.className}`);
        if (entry.boundingClientRect.y < 0) {
          selectedNavIndex = index + 1;
        } else {
          selectedNavIndex = index - 1;
        }
      }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

window.addEventListener("scroll", () => {
  if (scrollY === 0) {
    selectedItem(menuItems[0]);
  } else if (scrollY + innerHeight >= document.body.clientHeight - 30) {
    selectedItem(menuItems[menuItems.length - 1]);
  } else {
    selectedItem(menuItems[selectedNavIndex]);
  }
});
