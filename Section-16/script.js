'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//* L266
function renderError(message) {
    countriesContainer.insertAdjacentText("beforeend", message);
    countriesContainer.style.opacity = 1
}

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/

//! S16 - L260

//^ Old school (XMLHttpRequest)
//!! FATTE DELLE MODIFICHE NELLA RICHIESTA PERCHE IL CORSO USAVA UNA VERSIONE VECCHIA DEL API CHE ORA NON E PIU SUPPORTATA,
//!! PERCIO' CI SONO DELLE MODIFICHE PER FARE FUNZIONARE L'API
/*
function getCountryData(country) {
    const request = new XMLHttpRequest();

    request.open("GET", `https://api.restcountries.com/countries/v5/names.common/${country.toLowerCase().trim()}`);
    // Questi sono gli header necessari per effettuare la richiesta
    request.setRequestHeader(
        "Authorization",
        "Bearer rc_live_4608e10146694e959b464e9da2044ea6"
    );

    request.send();         // Qui mandiamo la richiesta

    request.addEventListener("load", function () {
        const data = JSON.parse(this.responseText)
        console.log(data);

        const country = data.data.objects[0]

        const html = `
        <article class="country">
            <img class="country__img" src="${country.flag.url_svg}" />
            <div class="country__data">
            <h3 class="country__name">${country.names.common}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${(Number(country.population) / 1000000).toFixed(1)} Mln people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
            </div>
        </article>
    `

        countriesContainer.insertAdjacentHTML("beforeend", html)        // Lo aggiunge all'index.html
        countriesContainer.style.opacity = 1
    });
}

getCountryData("italy")
getCountryData("denmark")
*/

//! S16 - L262

function renderCountry(country, className = "") {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${country.flag.url_svg}" />
            <div class="country__data">
            <h3 class="country__name">${country.names.common}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${(Number(country.population) / 1000000).toFixed(1)} Mln people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
            </div>
        </article>
    `

    countriesContainer.insertAdjacentHTML("beforeend", html)        // Lo aggiunge all'index.html
    // countriesContainer.style.opacity = 1
}

function getCountryAndNeighbour(country) {
    //^ AJAX call country 1
    const request = new XMLHttpRequest();
    request.open("GET", `https://api.restcountries.com/countries/v5/names.common/${country.toLowerCase().trim()}`);
    // Questi sono gli header necessari per effettuare la richiesta
    request.setRequestHeader(
        "Authorization",
        "Bearer rc_live_4608e10146694e959b464e9da2044ea6"
    );

    request.send();         // Qui mandiamo la richiesta

    request.addEventListener("load", function () {
        const data = JSON.parse(this.responseText)
        console.log(data);

        const country = data.data.objects[0]
        //^ Render country 1
        renderCountry(country)

        //^ Get neighbour country (2)
        const neighbour = country.borders?.[0]
        if (!neighbour) return

        //^ AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open("GET", `https://api.restcountries.com/countries/v5/codes.alpha_3/${neighbour}`);
        request2.setRequestHeader(
            "Authorization",
            "Bearer rc_live_4608e10146694e959b464e9da2044ea6"
        );
        request2.send();

        request2.addEventListener("load", function () {
            const data2 = JSON.parse(this.responseText)
            const country2 = data2.data.objects[0]
            renderCountry(country2, "neighbour")
        })
    });
}
/*
getCountryAndNeighbour("denmark")

//§ CALLBACK HELL
setTimeout(() => {
    console.log("E passato 1 secondo");
    setTimeout(() => {
        console.log("E passato 2 secondo");
        setTimeout(() => {
            console.log("E passato 3 secondo");
            setTimeout(() => {
                console.log("E passato 4 secondo");
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)
*/

//! S16 - L263 | Promises and the fetch API
/*
//^ Old Way
// const request2 = new XMLHttpRequest();
// request2.open("GET", `https://api.restcountries.com/countries/v5/codes.alpha_3/${neighbour}`);
// request2.setRequestHeader(
//     "Authorization",
//     "Bearer rc_live_4608e10146694e959b464e9da2044ea6"
// );
// request2.send(); 

//^ New method
const responce = fetch(`https://api.restcountries.com/countries/v5/names.common/denmark`)
console.log(responce);
*/

//! S16 - L264-265-266-267 | Consuming Promises, Chaining Promises, Handling Rejected Promises, Throwing Errors Manually
/*
// function getCountryData(country) {
//     fetch(`https://api.restcountries.com/countries/v5/names.common/${country.toLowerCase().trim()}`, { headers: { 'Authorization': 'Bearer rc_live_4608e10146694e959b464e9da2044ea6' } })
//     .then(function(responce) {
//         console.log(responce);
//         return responce.json();
//     })
//     .then(function(data) {
//         console.log(data.data);
//         renderCountry(data.data.objects[0])
//     })
// }

//^ Country 1
// function getCountryData(country) {
//     fetch(`https://api.restcountries.com/countries/v5/names.common/${country.toLowerCase().trim()}`, { headers: { 'Authorization': 'Bearer rc_live_4608e10146694e959b464e9da2044ea6' } })
//     .then(responce => {
//         //err => alert(err)       // Per gestire l'errore (pero questo getsisce solo l'errore di questa richiesta api)
//         //§ Errore personalizzato
//         if (!responce.ok) {
//             throw new Error(`Country not found (${responce.status})`);
//         }
//         return responce.json()
//     })
//     .then(data => {
//         const country = data.data.objects[0]
//         renderCountry(country)
//         const neighbour = country.borders?.[0]
//         if (!neighbour) return

        //^ Country 2
//         return fetch(`https://api.restcountries.com/countries/v5/codes.alpha_3/${neighbour}`, { headers: { 'Authorization': 'Bearer rc_live_4608e10146694e959b464e9da2044ea6' } })
//     })
//     .then((responce) => responce.json())
//     .then((data) => renderCountry(data.data.objects[0], "neighbour"))
        //& CATCH - Questo invece gestice tutti gli errori di tutti le richieste (invece di metterne uno per ogni richiesta)
//     .catch(err => {          
//         console.error(`${err} 💥💥💥`);
//         renderError(`Somthing went wrong 💥💥: ${err}`)
//     })
        //& FINALLY - La funzione ferra eseguita sempre, anche se ce un errore nella richiesta
//     .finally(() => {
//         countriesContainer.style.opacity = 1
//     })
// } 


function getJSON(url, errMsg = "Something went wrong") {
    return fetch(url, { headers: { 'Authorization': 'Bearer rc_live_4608e10146694e959b464e9da2044ea6' } })
    .then(responce => {
        //§ Errore personalizzato
        if (!responce.ok) {
            throw new Error(`${errMsg} (${responce.status})`);
        }
        return responce.json()
    })
}

//^ Country 1
function getCountryData(country) {
    getJSON(`https://api.restcountries.com/countries/v5/names.common/${country.toLowerCase().trim()}`, "Country not found")
    .then(data => {
        const country = data.data.objects[0]
        renderCountry(country)
        const neighbour = country.borders?.[0]
        if (!neighbour) throw new Error("No neighbour found!");
        
        //^ Country 2
        return getJSON(`https://api.restcountries.com/countries/v5/codes.alpha_3/${neighbour}`, "Country not found")
    })
    .then((data) => renderCountry(data.data.objects[0], "neighbour"))
    //& CATCH - Questo invece gestice tutti gli errori di tutti le richieste (invece di metterne uno per ogni richiesta)
    .catch(err => {          
        console.error(`${err} 💥💥💥`);
        renderError(`Somthing went wrong 💥💥: ${err}`)
    })
    //& FINALLY - La funzione ferra eseguita sempre, anche se ce un errore nella richiesta
    .finally(() => {
        countriesContainer.style.opacity = 1
    })
} 


btn.addEventListener("click", function() {
    getCountryData("denmark")
})
*/

//! S16 - L270
/*
console.log("Test Start");
setTimeout(() => console.log("0 seconds"), 0)
Promise.resolve("Resolved promise 1").then(res => console.log(res))     // Promise.resolve ci permette di creare una promise che verrà svolta subbito

Promise.resolve("Resolved promise 2").then(res => {
    for (let i = 0; i < 1000000000; i++){}
    console.log(res)
}) 

console.log("Test End");

//^ Stampa
// Test Start
// Test End
// Resolved promise 1
// 0 seconds
*/

//! S16 - L271 | Building a simple promise
/*
//^ A promise is a special kind of objects in JavaScript. It takes 1 parameter, the executor function
//^ Questa promise verrà eseguita subbito
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log("Lotter draw is happening 🔮");
    setTimeout(() => {
        //§ Se vinciamo la lotteria
        if (Math.random() >= 0.5) {
            resolve("You WIN 💶")       //? This will mark this promise as FULLFIELD
        } else {
            reject(new Error("You lost your money 💩"))     //? This will mark this promise as REJECTED
        }
    }, 2000)
})

lotteryPromise
    .then(res => console.log(res))          //* You WIN 💶
    .catch(err => console.error(err))       //* You lost your money 💩

//^ Promisifying setTimeout
function wait(seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    })
}

// Chain of sequency behavior, without callback hell
wait(2).then(() => {
    console.log("Ho aspettato 2 secondi")
    return wait(1);
}).then(() => console.log("Ho aspettato 1 secondo"))

Promise.resolve("viggo").then(x => console.log(x))
Promise.reject(new Error("viggo2")).catch(x => console.error(x))
*/

//! S16 - L272
/*
function getPosition() {
    return new Promise(function(resolve, reject) {
        //§ Fanno la stessa cosa
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // )

        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

getPosition().then(pos => console.log(pos))
*/

//! S16 - L274
//!! ORA NON USO PIU LE SUE API PERCHE LE VERSIONI CHE USA NON SONO PIU DISPONIBBILI O A PAGAMENTO
/*
const searchShow = async function(show) {
    //^ Sono la stessa cosa
    // const res = await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${show}`)).json()
    //^ Ma si preferisce lavorare con questa
    const res = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${show}`)
    const data = await res.json()
    
    console.log(data);
}

searchShow("the walking dead")
console.log("FIRST");
*/

//! S16 - L275
/*
// try {
//     let y = 1
//     const x = 2
//     x = 3
// } catch (error) {
//     alert(error.message)
// }

const searchShow = async function(show) {
    try {
        const res = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${show}`)
        const data = await res.json()
        //§ Errore personalizzato
        if (!data) throw new Error(`Nessuno show presente con il nome '${show}'`)
        console.log(data);
    } catch (error) {
        alert(error.message)
    }
}

searchShow("the walking dead")
console.log("FIRST");
*/

//! S16 - L276 | Returning values from async functions
/*
const searchShow = async function(show) {
    try {
        const res = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${show}`)
        const data = await res.json()
        //§ Errore personalizzato
        if (!data) throw new Error(`Nessuno show presente con il nome '${show}'`)
        console.log(data);

        return `Hai cercato la ${show}`
    } catch (error) {
        alert(error.message)
    }
}

//^ Sono la stessa cosa, solo che la prima mischia il metodo vecchio con then e cath, con qeuallo nuovo async await
// searchShow("the walking dead")
//     .then(show => console.log(show))
//     .catch(err => console.error(err))
//     .finally(() => console.log("FINISH"))

//^ Qui invece si usa solo la nuova metodologia con async await, e il try cath per gestire gli errori
(async function() {
    try {
        const show = await searchShow("the walking dead")
    } catch (error) {
        console.error(err)
    }
    console.log("FINISH")
}())
console.log("FIRST");
*/

//! S16 - L277 | Running promises in parallel
/*
async function get3Shows(s1, s2, s3) {
    //! Una funzione asincrona deve acere sempre il try catch
    try {
        //^ Si puo fare cosi, però la cosa e che cosi ci stapiu tempo a finire le 3 richieste, perché:
        //^ parte aspettiamo che finisce dataShow1, poi passiamo a dataShow2, apettiamo che finische e la stessa cosa per dataShow3.
        //^ Supponendo che ogni richiesta richieda 1 secondo, ci vorranno 3 secondi per ricevere i dati delle 3 richieste,
        //^ e questo non e ideale, perche si puo risparmiare tempo con Promise.all()
        // const dataShow1 = await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${s1}`)).json()
        // const dataShow2 = await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${s2}`)).json()
        // const dataShow3 = await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${s3}`)).json()
        // console.log([dataShow1.name, dataShow2.name, dataShow3.name]);

        //^ Con Promise.all() le 3 rischieste verranno effettuate allo stesso momento, in parallelo, perciò
        //^ supponendo come prima ci vuole 1 secondo per ogni richiesta, ci vorra solo 1 secondo per ricevere i dati dalle tre richieste,
        //^ perché lavorano in parallelo
        //! Se una richiesta fallisce, allora fallisce tutto il Promise.all()
        //? Promise.all() si usa se le richieste non dipendo una dall'altra (come in questo caso)
        const dataShows = await Promise.all([
            await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${s1}`)).json(),
            await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${s2}`)).json(),
            await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${s3}`)).json()
        ])
        console.log(dataShows.map(s => s.name));

    } catch (error) {
        console.error(error);
    }
}

get3Shows("the walking dead", "young royals", "elite")
*/

//! S16 - L278 | Promise combinators: race, allSettled and any

//§ Promise.race | The first settled promise wins the race
//^ Ovvero ci ritorna la prima richiesta che ritona completata (quella che ha inpiegato meno tempo)
(async function() {
     const res = await Promise.race([
        await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=the walking dead`)).json(),
        await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=young royals`)).json(),
        await (await fetch(`https://api.tvmaze.com/singlesearch/shows?q=elite`)).json()
     ])
     console.log(res);
})()

function timeOut(sec) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error("Request took too long!"))
        }, sec * 1000)
    })
}


Promise.race([
    fetch(`https://api.tvmaze.com/singlesearch/shows?q=the walking dead`).then(res => res.json()),
    timeOut(1),
])
.then(res => console.log(res))
.catch(err => console.error(err))


//§ Promise.allSettled | Restituisce il risultato di tutte le richieste

Promise.allSettled([
    Promise.resolve("Successo"),
    Promise.reject("ERRORE"),
    Promise.resolve("Successo 2")
]).then(res => console.log(res))
// [{status: "fulfilled", value: "Successo"}, {status: "rejected", reason: "ERRORE"}, {status: "fulfilled", value: "Successo 2"}]

//§ Promise.any | Le richgieste fallite vengono ignorate e restituisce lamprima che ha avuto successo

Promise.any([
    Promise.reject("ERRORE"),
    Promise.reject("ERRORE"),
    Promise.resolve("Successo"),    // Restituirà questa
    Promise.reject("ERRORE"),
    Promise.resolve("Successo 2")
]).then(res => console.log(res))