'use strict';

//! S10 - L135 | Functions Default Parameters
/*
const bookings = []

function createBooking(flNum, numPassengers = 1, price = 50 * numPassengers) {
    const booking = {
        flNum,
        numPassengers,
        price,
    }
    console.log(booking);
    bookings.push(booking)
}

createBooking("CT293");
createBooking("CPH123", 4)
createBooking("CPH123", undefined, 10)
*/

//! S10 - L136 | Passing arguments: Value vs reference
/*
const flight = "CT293"
const viggo = {
    name: "Viggo Ponturo Nygaard",
    passport: 98765435678987654
}

function chekIn(flightNum, passenger) {
    flightNum = "CPH123"
    passenger.name = "Mr. " + passenger.name;

    if (passenger.passport === 98765435678987654) {
        alert("Checked in! :D")
    } else {
        alert("Wrong passport!")
    }
}

chekIn(flight, viggo)
console.log(flight);
console.log(viggo);

function newPassoprt(person) {
    person.passport = Math.trunc(Math.random() * 100000000000000000);
}

newPassoprt(viggo)
chekIn(flight, viggo)
console.log(viggo);
*/


//! S10 - L138 | Higher Order Function
/*
function oneWord(str) {
    return str.replace(/ /g, "").toLowerCase()
}

function upperFirstWord(str) {
    const [first, ...others] = str.split(" ")
    return [first.toUpperCase(), ...others].join(" ")
}

//^ Higher Order Function
function transformer(str, fun) {
    console.log(`Original string: ${str}`);
    console.log(`Trasformed string: ${fun(str)}`);

    console.log(`Transformed by: ${fun.name}`);     // .name serve per ricevere il nome della funzione che stiamo utilizzando
}

transformer("Mi piace la pizza", upperFirstWord)
transformer("Mi piace la pizza", oneWord)
*/


//! S10 - L139 | Functions returning other functions
/*
function greet(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}

//§ Stessa cosa fatta con arrow function
const greet2 = (greeting) => (name) => console.log(`${greeting} ${name}`);

// Praticamnete greeterHey e diventata la funzione che ritorna la funzione greet
const greeterHey = greet("Hey")
greeterHey("Viggo")
greeterHey("Silas")

greet("Ciao")("Silas")


greet2("Hola")("Dora")
*/


//! L10 - S140-141
/*
const luftansa = {
    airline: "Luftansa",
    iataCode: "LH",
    bookings: [],

    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({fligth: `${this.iataCode}${flightNum}`, name})
    }
}

luftansa.book(234, "Viggo")
luftansa.book(234, "Salvatore")
console.log(luftansa.bookings);

const eurowings = {
    airline: "Eurowings",
    iataCode: "EW",
    bookings: [],
}

const book = luftansa.book

book.call(eurowings, 321, "Silas")
console.log(eurowings.bookings);

book.call(luftansa, 456, "Ofelia")
console.log(luftansa.bookings);

const swiss = {
    airline: "Swiss",
    iataCode: "SW",
    bookings: [],
}

//§ Call Method
book.call(swiss, 123, "Viggo")
console.log(swiss.bookings);

//§ Apply Method
const flighData = [678, "Viggo PN"]
// Sono la stessa cosa
book.apply(swiss, flighData)
book.call(swiss, ...flighData)
console.log(swiss.bookings);

//§ Bind Method
const bookEw = book.bind(eurowings)
const bookLH = book.bind(luftansa)
const bookSW = book.bind(swiss)

bookEw(12, "Viggo Pn")
console.log(eurowings.bookings);

const bookEW12 = book.bind(eurowings, 12);

bookEW12("Silas Pn")
console.log(eurowings.bookings);

//& With Event Listener
luftansa.planes = 300
luftansa.buyPlane = function() {
    console.log(this);
    this.planes++
    console.log(this.planes);
}

document.querySelector(".buy").addEventListener("click", luftansa.buyPlane.bind(luftansa))

//§ Partial application
const addTax = (rate, value) => value + value * rate
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.22)
console.log(addVAT(100));

// Funzione che ritorna un altra funzione
const addTax2 = (rate) => (value) => console.log(value + value * rate);

addTax2(0.22)(100)
*/


//! S10 - L143 | Immediatly Invoked Function Expression (IIFE)
/*
//^ Queste 2 funzioni saranno chiamate soltanto all'avvio del codice e inn nussun altro posto, percio verranno chiamate solo una volta
(function() {
    console.log("This will never run again!");
})();

(() => console.log("This will ALSO never run again!"))();
*/

//! S10 - L144 | Closures
/*
//^ Un clorure fa sì che una funzione ricordi tutte le variabili che esistevano nel punto di nascita della funzione
function secureBooking() {
    let passengerCount = 0

    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking();

booker()    // 1 passengers
booker()    // 2 passengers
booker()    // 3 passengers

console.dir(booker);
*/


//! S10 - L145 | More examples of closures
/*
//^ Example 1
let f;

function g() {
    const a = 23;
    f = function () {
        console.log(a * 2);
    }
}

function h() {
    const b = 777;
    f = function() {
        console.log(b * 2);
    }
}

g()
f()

//§ Re - Assigniment f function
h()
f()

console.dir(f);
*/

//^ Example 2

function boardPassengers(n, wait) {
    const perGroup = n / 3;
    // Puo utilizzare "perGroup" che ce fuori dalla funzione se non cere "perGroup" dentro la funzione

    setTimeout(function (){
        console.log(`We are now boarding all ${n} passengers!`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000)

    console.log(`Will start boarding in ${wait} seconds`);
}

const perGroup = 1000

boardPassengers(180, 5)