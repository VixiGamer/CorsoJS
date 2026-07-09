'use strict';

/*
Your tasks:

PART 1
    1. Write an async function 'loadNPause' that recreates Challenge #2, this time
    using async/await (only the part where the promise is consumed, reuse the
    'createImage' function from before);

    2. Compare the two versions, think about the big differences, and see which one
    you like more;

    3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
    in the dev tools Network tab;

PART 2
    1. Create an async function 'loadAll' that receives an array of image paths
    'imgArr';

    2. Use .map to loop over the array, to load all the images with the
    'createImage' function (call the resulting array 'imgs');

    3. Check out the 'imgs' array in the console! Is it like you expected?;

    4. Use a promise combinator function to actually get the images from the array 😉;

    5. Add the 'parallel' class to all the images (it has some CSS styles);
*/

const imgContainer = document.querySelector(".images")

function wait(seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    })
}

function createImage(imgPath) {
    return new Promise(function(resolve, reject) {
        const newImg = document.createElement('img')
        newImg.src = imgPath
        //^ Qui se l'immaggine vieve caricata correttamente, allora risolve la promise
        newImg.addEventListener("load", function() { 
            imgContainer.append(newImg)
            resolve(newImg)
        })
        //^ Qui invece se nel caricare l'immaggine da un errore
        newImg.addEventListener("error", function() { 
            reject(new Error("Image not found :("))
        })
    })
}

//§ PART 1
async function loadNPause() {
    try {
        const img1 = await createImage("https://image.tmdb.org/t/p/original/5kosg4zhYIuzTxbPcrJVFylgOYk.jpg")
        await wait(2)
        img1.classList.add("hidden")
        const img2 = await createImage("https://image.tmdb.org/t/p/original/gSMM7Y9dR289nJGTqQ5MNjTeodE.jpg")
        await wait(2)
        img2.classList.add("hidden")
    } catch (error) {
        alert(error);
    }
}

//§ PART 2
async function loadAll(imgArr) {
    try {
        const imgs = imgArr.map(imgUrl => createImage(imgUrl))   //^ Nen ce bisogno di usare querySelectorAll, perche abbiamo gia i riferimenti alle immaggini
        const imgsEl = await Promise.all(imgs)
        imgsEl.forEach(i => i.classList.add("parallel"));
    } catch (error) {
        alert(error);
    }
}

//loadNPause()
loadAll([
    "https://image.tmdb.org/t/p/original/5kosg4zhYIuzTxbPcrJVFylgOYk.jpg",
    "https://image.tmdb.org/t/p/original/5kosg4zhYIuzTxbPcrJVFylgOYk.jpg",
    "https://image.tmdb.org/t/p/original/rAOjnEFTuNysY7bot8zonhImGMh.jpg",
    "https://image.tmdb.org/t/p/original/eRrmxUMK6P5ZQ0GiH6TcazHmryE.jpg",
    "https://image.tmdb.org/t/p/original/qpUAdvHZDe7Cl7X2uHO3K8swW6A.jpg"
])