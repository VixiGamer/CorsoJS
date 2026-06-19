'use strict';

//! L7 - L83-85
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelectorAll(".show-modal"); // Seleziona tutti gli elementi con quella classe

// Creiamo 2 funzioni per. aprire. e chiudeerre la modale cosi da non ripetere il codice. DRY
function openModal() {
    modal.classList.remove("hidden")    // Questo serve per rimouvere la classe "hidden" che fa nascondere la modal
    overlay.classList.remove("hidden")
}

function closeModal() {
    modal.classList.add("hidden")   // Questo serve per aggiungere la classe "hidden" che fa vedere la modal
    overlay.classList.add("hidden")
}

// Questo ciclo for serve per fergli fare a tutti e tre la stessa cosa
for (let i = 0; i < btnOpenModal.length; i++) {
    btnOpenModal[i].addEventListener("click", openModal);
};

btnCloseModal.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)

// Questo significa che stiamo aspettando per un evento in tutta la paggina
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {    // Cosi quando premo "Esc" e la modal NON ha la classe "hidden", allora chiedi la modale
        closeModal();
    }
})