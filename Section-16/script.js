'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/

//! S16 - L260

//^ Old school (XMLHttpRequest)
//!! FATTE DELLE MODIFICHE PERCHE IL CORSO USAVA UNA VERSIONE VECCHIA DEL API CHE ORA NON E PIU SUPPORTATA,
//!! PERCIO' CI SONO DELLE MODIFICHE PER FARE FUNZIONARE L'API

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

    countriesContainer.insertAdjacentHTML("beforeend", html)
    countriesContainer.style.opacity = 1
    });
}

getCountryData("italy")
getCountryData("denmark")