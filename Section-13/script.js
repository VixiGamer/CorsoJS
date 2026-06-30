'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to")

const section1 = document.querySelector("#section--1")

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", (e) => {
  const s1coords = section1.getBoundingClientRect()
  console.log(s1coords);

  /*
    > "window.pageXOffset" e quanto abbiamo scrollato in orizontale
    > "window.pageYOffset "e quando abbiamo scrollato in verticale

    > "document.documentElement.clientHeight" e "document.documentElement.clientWidth" l'altezza della "finestra" che si vede la paggina
      (se apro ispeziona elemento e piu piccola)
  */
  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);
  console.log("height/width vieport", document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  //window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, 
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth"
  // })

  section1.scrollIntoView({ behavior: "smooth" })
});


//! S13 - L198-199 | Selecting, Creating, and Deleating Elements & Styles, Attributes and Classes
/*
//^ L198
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header")
const allSections = document.querySelectorAll(".section")
console.log(allSections);

document.getElementById("section--1")
const allButtons = document.getElementsByTagName("button")
console.log(allButtons);

console.log(document.getElementsByClassName("btn"));

//§ Creating and inserting elements
const message = document.createElement("div")
message.classList.add("cookie-message")
message.innerHTML = 'We use cookie for improved functionality analitics. <button class="btn btn--close--cookie">Got it!</button>'

//header.prepend(message)
header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

//§ Delete elements
document.querySelector(".btn--close--cookie").addEventListener("click", () => message.remove())

//^ L199
//§ Styles
message.style.backgroundColor = "#37383d"
message.style.width = "120%"

console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"

// modificare una variabbile css
document.documentElement.style.setProperty("--color-primary", "orange")

//§ Attributes
const logo = document.querySelector(".nav__logo")
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Beutifull minimalist logo"
console.log(logo.alt);

// Non-starndard
console.log(logo.designer);                   // undefined
console.log(logo.getAttribute("designer"));   // Viggo PN
logo.setAttribute("company", "Bankist")

console.log(logo.src);
console.log(logo.getAttribute("src"));

console.log(logo.src);
console.log(logo.getAttribute("src"));

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

//§ Data attributes
console.log(logo.dataset.versionNumber);

//§ Classes
logo.classList.add("c")
logo.classList.remove("c")
logo.classList.toggle("c")
logo.classList.contains("c")

//! DON'T USE - OVERRIDES
logo.className = "viggo"
*/

//! S13 - L201
/*
const h1 = document.querySelector("h1")

const allertH1 = (e) => {
  alert("You are reading the headding")
  // Cosi l'allert si attivera solo una volta
  h1.removeEventListener("mouseenter", allertH1)  
}

h1.addEventListener("mouseenter", allertH1)

// Old School
// h1.onmouseenter = (e) => {
//   alert("You are reading the headding")

// }
*/

//! S13 - L203 | Bubbling

const randomInt = (min = 0, max = 255) => Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () => `rgb(${randomInt()}, ${randomInt()}, ${randomInt()})`


// Quando premo il singolo nav link si attivano sia il link, sia il contenitore dei link e sia la navbar, questo e il BUBBLING
// Invece quadno premo il contenitore dei link, cambiano solo il contenitore dei link e la nav, NON IL SINGOLO LINK,
// e la stessa cosa se premo la navbar, cambia solo la navbar

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propragation (Bubbling)
  //e.stopPropagation()
})

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
})

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAVBAR", e.target, e.currentTarget);
})