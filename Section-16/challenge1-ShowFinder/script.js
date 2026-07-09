'use strict';

/*
====================================================
CHALLENGE: TV EXPLORER 🎬
====================================================

In this challenge you will build a function
"showInfo" which displays information about a TV show.

You will use the TVMaze API to perform two
different requests.

You will practice:

- Fetch API
- Promises
- Promise chaining
- Multiple API requests
- Error handling
- JSON parsing
- DOM manipulation


API DOCUMENTATION:

https://www.tvmaze.com/api


====================================================
PART 1 - SEARCH A TV SHOW
====================================================


*1. Create a function called:

   showInfo(showName)

   The function receives the name of a TV show.

   Example:
        showInfo("Breaking Bad");



----------------------------------------------------


*2. Use the TVMaze Search API.
   Endpoint:
        https://api.tvmaze.com/search/shows?q=SHOW_NAME

   Use:
    - fetch()
    - promises
    - .then()



----------------------------------------------------


*3. Check the response in the console.
   Find these properties:
    - show name
    - genres
    - language
    - premiered date
    - rating
    - image
    - show ID

   Print a message like:
   "Breaking Bad is a Drama series released in 2008"



----------------------------------------------------


*4. Handle HTTP errors manually.
   Remember:
    fetch() does not reject automatically
    when the server returns HTTP errors.

   Create your own error:

   if(!response.ok){
       throw new Error("Show request failed");
   }



----------------------------------------------------


*5. Add a .catch() method.
   Display errors:
        "Something went wrong: ERROR MESSAGE"



====================================================
PART 2 - GET THE CAST
====================================================


*6. Use the show ID received from the first API.
   Make a second API request:
    https://api.tvmaze.com/shows/SHOW_ID/cast



----------------------------------------------------


*7. Retrieve information about the actors:
   - actor name
   - character name
   - actor image

----------------------------------------------------


*8. Display the first 5 actors of the show.
    Example:
        🎬 Breaking Bad
        Main Cast:

        👤 Bryan Cranston
        Character:
        Walter White

        👤 Aaron Paul
        Character:
        Jesse Pinkman



====================================================
TEST DATA
====================================================


Test 1:
showInfo("Breaking Bad")

Test 2:
showInfo("Friends")

Test 3:
showInfo("The Walking Dead")



====================================================
BONUS CHALLENGES 🚀
====================================================


*1. Add an input field and a search button.

Example:
    [ Breaking Bad ]
    [ Search ]

----------------------------------------------------


*2. Display the show poster image.

*/

const btn = document.getElementById("searchBtn");
const textSuggestion = document.getElementById("textSuggestion");
const showCard = document.querySelector(".show-card");
const showName = document.querySelector(".show-card__name");
const showImgUrl = document.querySelector(".show-card__img");
const showGenres = document.querySelector(".show-card__genre");
const showLanguage = document.querySelector(".show-card__language");
const showPremierDate = document.querySelector(".show-card__date");
const showRating = document.querySelector(".show-card__rating");
const showStatus = document.querySelector(".show-card__status");


btn.addEventListener("click", function () {
    const show = document.getElementById("showInput").value;
    showInfo(show);
});

// Passare direttamente tutta la serie e poi prendo io ogni elemento da li
function setShowInfo(showData) {
    const date = new Date(showData.show.premiered)
    showName.textContent = showData.show.name
    showImgUrl.src = showData.show?.image?.original;
    showGenres.textContent = showData.show.genres.join(" - ")
    showLanguage.textContent = showData.show.language
    showPremierDate.textContent = `${String(date.getDate()).padStart(2, "0")}/${(String(date.getMonth() + 1)).padStart(2, "0")}/${date.getFullYear()}`
    showRating.textContent = showData.show.rating.average
    showStatus.textContent = showData.show.status
}



function showInfo(showName) {
    let realShowName
    fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
        .then(response => {
            if (response.status !== 200) {
                textSuggestion.classList.remove("hidden")
                showCard.classList.add("hidden")
                throw new Error(`Error on the request`)
            }
            
            return response.json()
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error(`No show with the name '${showName}'`);
            }
            const show = data[0]
            textSuggestion.classList.add("hidden")
            showCard.classList.remove("hidden")
            setShowInfo(show)
            realShowName = show.show.name
            const showId = show.show.id
            const showPremierDate = new Date(show.show.premiered)

            console.log(`${realShowName} is a ${show.show.genres.join(", ")} series released in ${showPremierDate.getFullYear()}`);

            return fetch(`https://api.tvmaze.com/shows/${showId}/cast`).then(response => response.json())
        })
        .then(data => {
            //     actor name, character name, actor image
            const actors = data.slice(0, 6)
            let str = `
            🎬 ${realShowName}
            Main Cast:
        `
            actors.forEach(ac => {
                str += `
                👤 ${ac.person.name}
                Character:
                ${ac.character.name}
            `
            });
            console.log(str);
        })
        .catch(err => {
            console.error(`Something went wrong: ${err}`);
        })

}