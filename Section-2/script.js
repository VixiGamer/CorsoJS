/*
let jsIsFun = true
console.log(typeof jsIsFun)
console.log(typeof true)
console.log(typeof "true")
console.log(typeof 13)

jsIsFun = "Viggo"

console.log(typeof jsIsFun)
*/

//! S2 - L14
/*
const now = 2026
const ageViggo = now - 2004
const ageSilas = now - 2007

console.log(now - 1991 > now - 2018)
console.log(ageViggo > ageSilas)

let x, y
x = y = 25 - 10 - 5
console.log(x, y)
*/


//! S2 - L17
/*
const firstName = "Viggo"
const job = "programmatore"
const birthYear = 2004
const year = 2026

const presentation = "Sono " + firstName + ", ho " + (year - birthYear) + " anni, e faccio il " + job
const newPresentation = `Sono ${firstName}, ho ${year - birthYear} anni, e faccio il ${job}`
console.log(presentation)
console.log(newPresentation)
*/


//! S2 - L18
/*
const age = 22

if (age > 18) {
    console.log("The user is old enough to drive 🚗")
} else {
    const yearsLeft = 18 - age
    console.log(`The user is to young to drive. The user has to wait ${yearsLeft} years :)`)
}

const birthYear = 2004
let century

if (birthYear <= 2000) {
    century = 20
} else {
    century = 21
}
console.log(century)
*/


//! S2 - L20
/*
// TYPE CONVERTION e quando cambiamo manualmente il tipo
const inputYear = "2004"
console.log(Number(inputYear) + 18)
console.log(Number("Viggo")) //Restituisce NaN perchè non puo essere convertito in un numero
console.log(typeof NaN)

console.log(String(23), 23)


// Type coortion e quando js lo cambia da solo
// Il + lo trasforma in stringha
// Il -, *, / lo trasforma in numero
console.log("Ho " + 22 + " anni")
console.log("23" - "10" - 3)
console.log("23" * 3)
*/


//! S2 - L21
//§ FALSY: 0, ", undefined, null, NaN"
/*
console.log(Boolean(0))
console.log(Boolean(undefined))
console.log(Boolean("Viggo"))
console.log(Boolean({}))
console.log(Boolean(""))

const money = 0

if (money) {
    console.log("Don't spendt it all ;)")
} else {
    console.log("Go get a job")
}

let height; 
if (height) {
    console.log("Height is defined")
} else {
    console.log("Height is UNDEFINED") // Stampa questo perche height e undefined e undefined è FALSY
}
*/

//! S2 - L22
/*
const age = 18;
if (age === 18) console.log("Sei un adulto :D (strict)")
if (age == 18) console.log("Sei un adulto :D (loose)")

const favoriteNumber = Number(prompt("Quale e il tuo numero preferito"));
console.log(favoriteNumber)
console.log(typeof favoriteNumber)

if (favoriteNumber === 13) {
    console.log("13 :D")
} else if(favoriteNumber === 7) {
    console.log("7 :|")
} else {
    console.log("Il numero non e né 13 né 7 :(")
}

if (favoriteNumber !== 13) {
    console.log("Perché no 13? :(")
}
*/

//! S2 - L24
/*
const patente = true;
const buonaVista = true;

console.log(patente && buonaVista)
console.log(patente || buonaVista)
console.log(!patente)

const seiStanco = true
console.log(patente && buonaVista && seiStanco)

if (patente && buonaVista && !seiStanco) {
    console.log("Puoi guidare :D")
} else {
    console.log("NON puoi guidare :(")
}
*/


//! S2 - L26
/*
const day = "monday";
switch (day) {
    case "monday":
        console.log("JWE2")
        break;
    
    case "tuesday":
        console.log("Minecraft")
        break;
    
    case "wednesday":
    case "thursday":
        console.log("Far Cry")
        break;
    
    case "saturday":
    case "sunday":
        console.log("Vacanza")
        break;
    
    default:
        console.log("Non un giorno valido")
        break;
}

if (day === "monday") {
    console.log("JWE2")
} else if(day === "tuesday") {
    console.log("Minecraft")
} else  if(day === "wednesday" || day === "thursday") {
    console.log("Far Cry")
} else  if(day === "saturday" || day === "sunday") {
    console.log("Vacanza")
} else {
    console.log("Non un giorno valido")
}
*/


//! S2 - L27
/*
//Statment
if (23 > 10) {
    const str = "23 e piu grande"
}
//Expression
console.log(`Ho ${2026 - 2004} anni`)
*/


//! S2 - L28 | Operatore ternario
/*
const age = 22;
age >= 18 ? console.log("Posso bere :D") : console.log("NON posso bere :(");

const drink = age >= 18 ? "vino" : "acqua";
console.log(drink)

let drink2;
if (age >= 18) {
    drink2 = "vino"
} else {
    drink2 = "acqua"
}
console.log(drink2)

console.log(`Mi piace bere ${age >= 18 ? "vino" : "acqua"}`)
*/


//! S2 - L30
