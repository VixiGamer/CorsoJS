'use strict';
/*
0. Seleziona lo schermo: Recupera l'elemento #screen usando il suo ID.

1. Seleziona i bottoni: Recupera i bottoni che ti servono (puoi iniziare selezionandone solo alcuni,
    ad esempio i numeri 1, 2, +, C e =).

2. Logica dei numeri: Fai in modo che quando clicchi sul bottone 1, il suo testo si aggiunga allo schermo.
    > Suggerimento: Se lo schermo mostra "0", sostituiscilo con "1".
    Se mostra già qualcosa, aggiungilo in coda (es: schermo.innerText += "1").

3. Logica del tasto C (Clear): Quando viene cliccato il tasto C, 
    resetta il testo dello schermo facendolo tornare a "0".

4. Logica delle operazioni: Quando clicchi su +, -, * o /, 
    aggiungi quel simbolo sullo schermo (es: se lo schermo ha 5 e clicchi +, lo schermo deve mostrare 5+).

5. Logica del tasto Uguale (=): Quando l'utente clicca =,

    devi calcolare il risultato di quello che c'è scritto sullo schermo.

    > Super Suggerimento: JavaScript ha una funzione nativa fantastica chiamata eval(). 
    Se le passi una stringa come "5+3", lei calcola automaticamente il risultato! 
    Ti basta fare: schermo.innerText = eval(schermo.innerText);

Provaci! Inizia anche solo a far funzionare i tasti 1, 2, + e =. Quando hai scritto il codice, mostramelo e lo sistemiamo insieme!
*/

let screen = document.getElementById("screen")
const btnC = document.getElementById("btnC");
const btnEq = document.getElementById("btnEq");
const btnDiv = document.getElementById("btnDiv");
const btnMult = document.getElementById("btnMult");
const btnMeno = document.getElementById("btnMeno");
const btnPiu = document.getElementById("btnPiu");
const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const btn9 = document.getElementById("btn9");

console.log(screen)

function btnNumber(num) {
    if (screen.textContent === "0") {
        screen.textContent = `${num}`;
    } else {
        screen.textContent += `${num}`;
    }
}

function btnOpp(opp) {
    // at(-1) serve per vedere l'ultima lettera di una stringa
    if (screen.textContent !== "0" 
        && screen.textContent.at(-1) !== "+" 
        && screen.textContent.at(-1) !== "*" 
        && screen.textContent.at(-1) !== "-" 
        && screen.textContent.at(-1) !== "/")
        {
        screen.textContent += opp
    }
}

// I pulsanti per i numeri numeri
btn0.addEventListener("click", () => btnNumber(0));
btn1.addEventListener("click", () => btnNumber(1));
btn2.addEventListener("click", () => btnNumber(2));
btn3.addEventListener("click", () => btnNumber(3));
btn4.addEventListener("click", () => btnNumber(4));
btn5.addEventListener("click", () => btnNumber(5));
btn6.addEventListener("click", () => btnNumber(6));
btn7.addEventListener("click", () => btnNumber(7));
btn8.addEventListener("click", () => btnNumber(8));
btn9.addEventListener("click", () => btnNumber(9));

// I pulsanti per le operazioni
btnPiu.addEventListener("click", () => btnOpp("+"))
btnMeno.addEventListener("click", () => btnOpp("-"))
btnMult.addEventListener("click", () => btnOpp("*"))
btnDiv.addEventListener("click", () => btnOpp("/"))

btnC.addEventListener("click", () => screen.textContent = "0")
btnEq.addEventListener("click", () => {

    if (screen.textContent.at(-1) !== "+" 
        && screen.textContent.at(-1) !== "*" 
        && screen.textContent.at(-1) !== "-" 
        && screen.textContent.at(-1) !== "/")
        {
        const tot = eval(screen.textContent)
        screen.textContent = tot
    }
})
