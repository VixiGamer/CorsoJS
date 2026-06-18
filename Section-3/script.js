"use strict";

//! S3 - L33
/*
let hasDriverLincense = false;
const passTest = true;

if (passTest) hasDriverLincense = true;
if (hasDriverLincense) console.log("Posso guidare :D")
*/


//! S3 - L34 | Functions
/*
function logger() {
    console.log("Mi chiamo Viggo")
}
logger();

function fruitProcessor(pesche, arancie) {
    const juice = `Juice with ${pesche} pesche and ${arancie} arancie`
    return juice
}

const spremuta = fruitProcessor(2, 3)
console.log(spremuta)
*/


//! S3 - L35
/*
// Function Declaration
function calcAge1(birthYear) {
    return 2026 - birthYear;
}
const age1 = calcAge1(2004)

// Function Expression
const calcAge2 = function (birthYear) {
    return 2026 - birthYear;
}
const age2 = calcAge2(2004)
console.log(age1, age2)
*/


//! S3 - L36 | Arrow Function
/*
const calcAge3 = birthYear => 2026 - birthYear
const age3 = calcAge3(2004)
console.log(age3)

const yearsUntilRetirement = (name, birthYear) => {
    const age = 2026 - birthYear
    const retirement = 65 - age
    return `${name} andrà in pensione fra ${retirement} anni`;
}

console.log(yearsUntilRetirement("Viggo", 2004))
*/


//! S3 - L37 | Functions calling other functions
/*
function cutFruit(fruit) {
    return fruit * 4
}

function fruitProcessor(pesche, arancie) {
    const cutPesche = cutFruit(pesche)
    const cutArancie = cutFruit(arancie)

    const juice = `Juice with ${cutPesche} pieces of pesche and ${cutArancie} pieces of arancie`
    return juice
}

console.log(fruitProcessor(2, 3));
*/


//! S3 - L38
/*
function calcAge(birthYear) {
    return 2026 - birthYear
}

function yearsUntilRetirement(name, birthYear) {
    const retirement = 65 - calcAge(birthYear);
    if (retirement > 0) {
        console.log(`${name} andrà in pensione fra ${retirement} anni :(`)
        return retirement;
    } else {
        console.log(`${name} e già in pensione :D`)
        return retirement;
    }
}
console.log(yearsUntilRetirement("Viggo", 2004));
console.log(yearsUntilRetirement("Dina", 1933));
*/


//! S3 - L40 | Array
/*
const friends = ["Linda", "Gioele", "Giuseppe", "Vincenzo"]
console.log(friends)
console.log(friends[0])
console.log(friends.length)
console.log(friends[friends.length - 1])

friends[2] = "Salvatore"
console.log(friends)

const y = new Array(1933, 2004, 2007)
console.log(y)

const Viggo = ["Viggo", "Ponturo Nygaard", 2026 - 2004, "programmatore", ["Linda", "Gioele", "Giuseppe", "Vincenzo"]]
console.log(Viggo)
console.log(Viggo.length)

//& Esercizio
const calcAge = (birthYear) => 2026 - birthYear
const years = [1990, 2000, 2010, 2015, 2020, 2025]

const age1 = calcAge(years[0])
const age2 = calcAge(years[1])
const age3 = calcAge(years[years.length - 1])
console.log(age1, age2, age3)

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])]
console.log(ages)
*/


//! S3 - L41