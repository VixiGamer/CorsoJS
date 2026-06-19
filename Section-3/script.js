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

//! S3 - L41 | push, unshift, pop
/*
const friends = ["Linda", "Gioele", "Giuseppe", "Vincenzo"];
const newLenght = friends.push("Mirko"); //Il push ritorna il numero di elementi ceh ce nell'array dopo aver pushato
console.log(friends)
console.log(newLenght)

friends.unshift("Salvatore")
console.log(friends)

const popped = friends.pop()    // ritorna l'elemento eliminato
console.log(friends)
console.log(popped)

friends.shift()
console.log(friends)

console.log(friends.indexOf("Vincenzo"))
console.log(friends.indexOf("Silas"))
console.log(friends.includes("Silas"))

if (friends.includes("Vincenzo")) {
    console.log("Hai un amico che si chiama Vincenzo")
}
*/

//! S3 - L43/44 | Oggetti
/*
const viggo = {
    name: "Viggo",
    surname: "Ponturo Nygaard",
    age: 2026 - 2004,
    job: "Programmatore",
    friends: ["Linda", "Gioele", "Giuseppe", "Vincenzo"]
}
console.log(viggo)
console.log(viggo.surname)
console.log(viggo["name"])

const nameKey = "name"
console.log(viggo[nameKey])
console.log(viggo["sur" + nameKey])

const interestedIn = prompt("Cosa vuoi sapere di Viggo? Scegli tra: name, surname, age, job, friends")
if (viggo[interestedIn]) {
    console.log(viggo[interestedIn])
} else {
    console.log("Wrong request! Scegli tra: name, surname, age, job, friends")
}

// Per aggiungere elementi al Oggetto
viggo.location = "Italy"
viggo.nationality = "Italian & Danish"
console.log(viggo)

// Mini Challenge
console.log(`${viggo.name} has ${viggo.friends.length} friends, and his best friend is ${viggo.friends[0]}`)
*/

//! S3 - L45
/*
const viggo = {
    name: "Viggo",
    surname: "Ponturo Nygaard",
    birthyear: 2004,
    job: "Programmatore",
    friends: ["Linda", "Gioele", "Giuseppe", "Vincenzo"],
    hasDriverLicense: true,

    // calcAge: function() {
    //     return 2026 - this.birthyear
    // }

    calcAge: function() {
        this.age = 2026 - this.birthyear
        return this.age;
    },

    getSummury: function() {
        return `${this.name} ha ${this.calcAge()}, ed fa il ${this.job}, e ${this.name} ${this.hasDriverLicense ? "ha": "non ha"} la patente`
    }
}

console.log(viggo.calcAge())
// console.log(viggo["calcAge"](2007))
console.log(viggo.age)

console.log(viggo.getSummury())
*/

//! S3 - L47 | for
/*
for (let i = 1; i <= 10; i++) {
    console.log(`Salto ${i}`)
}
*/

//! S3 - L48 | for, continue, break
/*
const viggo = [
    "Viggo", 
    "Ponturo Nygaard", 
    22, 
    "Programmatore", 
    ["Linda", "Gioele", "Giuseppe", "Vincenzo"], 
    true
]

const types = new Array()

for (let i = 0; i < viggo.length; i++) {
    console.log(viggo[i], typeof viggo[i])
    types.push(typeof viggo[i])
}

console.log(types)

const years = [1933, 1975, 1963, 2004, 2007]
const ages = new Array()

for (let i = 0; i < years.length; i++) {
    let age = 2026 - years[i]
    ages.push(age)
}
console.log(ages)

// continue, break
console.log("------ONLY STRINGS------") // Stampa solo stringhe
for (let i = 0; i < viggo.length; i++) {
    if (typeof viggo[i] !== "string") continue
    console.log(viggo[i], typeof viggo[i])
}

console.log("------BREAK WITH NUMBER------") // Si ferma quando incontra il primo numero
for (let i = 0; i < viggo.length; i++) {
    if (typeof viggo[i] === "number") break
    console.log(viggo[i], typeof viggo[i])
}
*/

//! S3 - L49 | for dentro un for
/*
const viggo = [
    "Viggo", 
    "Ponturo Nygaard", 
    22, 
    "Programmatore", 
    ["Linda", "Gioele", "Giuseppe", "Vincenzo"]
];

for (let i = viggo.length - 1; i >= 0; i--) {
    console.log(viggo[i])
}

for (let i = 1; i <= 3; i++) {
    console.log(`------Starrting Exercise ${i}------`)
    for (let i = 0; i < 6; i++) {
        console.log(`Salto ${i}`)
    }
}
*/

//! S3 - L50 | while
let s = 1;
while (s <= 10) {
  // console.log(`Salto ${s}`)
  s++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`E uscito ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) {
    console.log("E uscito 6 :D");
  }
}