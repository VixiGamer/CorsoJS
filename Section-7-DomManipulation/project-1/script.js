'use strict';
//! S7 - L74
//console.log(document.querySelector(".message").textContent);

//! S7 - L76
/*
// Qui cambio il messaggio
document.querySelector(".message").textContent = "Correct Number 🎉"

// Qui cambio sia il numero ceh lo score
document.querySelector(".number").textContent = 13
document.querySelector(".score").textContent = 10

//qui cambio il numero che io dovrei indovinare
document.querySelector(".guess").value = 22
console.log(document.querySelector(".guess").value); 
*/

//! S7 - L77-82
/* Qui stiamo selezionando il pulsantye tramite la sua classe css "check",
   e gli stiamo dicendo di "ascoltare per un evento click",
   e poi gli passiamo una funzione che verra avviata quando l'evento si effettua,
   percio nel nostro caso quando il pulsante viene premuto la funzione si avvierà,
   che a sua volta dentro la funzione gli diciamo di stampare il valore che c'è dentro l'imput*/


let number = newNumber()

function newNumber() {
    const newNumber = Math.trunc(Math.random() * 20) + 1
    return newNumber
}

function displayMessage(message) {
    document.querySelector(".message").textContent = message
}

let score = 20
let highScore = 0

document.querySelector(".check").addEventListener("click", () => {
    const guess = Number(document.querySelector(".guess").value)
    console.log(guess);

        // Quando non c'è input
    if (!guess) {
        displayMessage("No number ⛔️")

        // Qunado l'utente vince
    } else if (guess === number) {
        displayMessage("Correct Number 🎉")
        document.querySelector("body").style.backgroundColor = "#60b347"
        document.querySelector(".number").style.width = "30rem"
        document.querySelector(".number").textContent = number
        if (score > highScore) {
            highScore = score
            document.querySelector(".highscore").textContent = highScore
        }

        // Quando l'utente sbaglia
    } else if (guess !== number) {
        if (score > 1) {
            displayMessage(guess > number ? "Too high 📈" : "Too low 📉")
            score--
            document.querySelector(".score").textContent = score
        } else {
            displayMessage("You lost the game 💣")
            document.querySelector(".score").textContent = 0
        }
    }
})

document.querySelector(".again").addEventListener("click", () => {
    number = newNumber()
    displayMessage("Start guessing...")
    document.querySelector(".score").textContent = 20
    score = 20
    document.querySelector(".guess").value = ""
    document.querySelector("body").style.backgroundColor = "#222"
    document.querySelector(".number").style.width = "15rem"
    document.querySelector(".number").textContent = "?"
})
