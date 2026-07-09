"use strict";

/*
====================================================
                TVMAZE CODING CHALLENGE
====================================================

PART 1 - getShow()

1. Crea una funzione getShow(showName).

2. La funzione deve restituire una Promise.

3. All'interno della Promise esegui una richiesta a:
   https://api.tvmaze.com/search/shows?q=${showName}

4. Se la richiesta ha successo:
   - crea una card HTML dinamicamente;
   - inserisci nella card:
       • Poster
       • Titolo
       • Rating
       • Lingua
       • Stato
   - aggiungi la card al container ".shows";
   - risolvi la Promise con l'elemento HTML creato
     (resolve(cardElement)).

5. Se la serie non esiste oppure la richiesta fallisce:
   - rifiuta la Promise (reject).

----------------------------------------------------

PART 2 - Promise Chain

Quando viene premuto il pulsante "Load Sequential":

1. Carica "Breaking Bad".
2. Attendi 2 secondi usando wait().
3. Nascondi la card.
4. Carica "Dark".
5. Attendi altri 2 secondi.
6. Nascondi la seconda card.

Regole:
- Usa SOLO .then() e .catch().
- Non usare async/await.
- Ti servirà una variabile globale per salvare
  l'ultima card caricata.

----------------------------------------------------

PART 3 - Async/Await

Ricrea il comportamento del PART 2
utilizzando async/await.

Crea una funzione:

loadNPause()

che:
- carica "Breaking Bad";
- aspetta 2 secondi;
- nasconde la card;
- carica "Dark";
- aspetta 2 secondi;
- nasconde la card.

Ricorda di gestire gli errori con try/catch.

----------------------------------------------------

PART 4 - Promise.all()

Crea una funzione:

loadAll(shows)

che riceve un array di nomi di serie TV.

Esempio:

[
    "Breaking Bad",
    "Dark",
    "Friends",
    "Sherlock",
    "Lost"
]

1. Usa map() per creare un array di Promise
   chiamato imgs (o come preferisci).

2. Controlla nel console.log il contenuto
   dell'array.

3. Usa Promise.all() per attendere il caricamento
   di tutte le serie.

4. Quando tutte sono state caricate,
   aggiungi la classe CSS "parallel"
   a ogni card.

----------------------------------------------------

BONUS

Aggiungi nella card anche:

- Anno di uscita
- Generi
- Network
- Link ufficiale
- Riassunto della serie

====================================================
*/

const containerShows = document.querySelector(".shows");
const btnLoadOne = document.querySelector(".btn-load-one");
const btnLoadAll = document.querySelector(".btn-load-all");

function wait(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

/*
async function getShow(showName) {
    try {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
        const data = await res.json()
        const show = data[0].show
        if (!data) reject(new Error(`Nessuno show presente con il nome '${showName}'`))
        
        const showCard = `
            <div class="show">
                <img 
                    src="${show.image.original}"
                    alt="${show.name} poster"
                >

                <div class="info">
                    <h2>${show.name}</h2>
                    <p>
                        <strong>Rating:</strong> ${show.rating.average}
                    </p>
                    <p>
                        <strong>Language:</strong> ${show.language}
                    </p>
                    <p>
                        <strong>Status:</strong> ${show.status}
                    </p>
                </div>
            </div>
        `
        containerShows.insertAdjacentHTML("afterbegin", showCard)

        console.log(showCard);
    } catch (error) {
        console.error(error);
    }
}
*/


function getShow(showName) {
    return new Promise(function (resolve, reject) {
        fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
            .then(res => res.json())
            .then(res => {
                const show = res[0].show
                //console.log(show);
                if (!show) reject(new Error(`Nessuno show presente con il nome '${showName}'`))

                if (show) {
                    const showCard = `
                        <div class="show">
                            <img 
                                src="${show.image.original}"
                                alt="${show.name} poster"
                            >

                            <div class="info">
                                <h2>${show.name}</h2>
                                <p>
                                    <strong>Rating:</strong> ${show.rating.average}
                                </p>
                                <p>
                                    <strong>Language:</strong> ${show.language}
                                </p>
                                <p>
                                    <strong>Status:</strong> ${show.status}
                                </p>
                            </div>
                        </div>
                    `
                    containerShows.insertAdjacentHTML("afterbegin", showCard)
                    const cardElement = containerShows.firstElementChild;
                    resolve(cardElement)
                }
            })
            .catch(error => console.error(error))
    })
}

async function renderShow() {
    try {
        await wait(2)
        const show1 = await getShow("the walking dead")
        console.log(show1);
        await wait(2)
        show1.classList.add("hidden")
        const show2 = await getShow("breaking bad")
        await wait(2)
        show2.classList.add("hidden")
    } catch (error) {
        console.error(error);
    }
}

async function loadAll(showsName) {
    try {
        const imgs = showsName.map(s => getShow(s))
        const imgsEl = await Promise.all(imgs)
        imgsEl.forEach(sc => sc.classList.add("parallel"))
        console.log(imgsEl);
    } catch (error) {
        console.error(error);
    }
}


btnLoadOne.addEventListener("click", function () {
    renderShow()
});

btnLoadAll.addEventListener("click", function () {
    loadAll([
        "Breaking Bad",
        "Dark",
        "Friends",
        "Sherlock",
        "Lost"
    ])
});

