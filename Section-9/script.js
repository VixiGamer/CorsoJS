'use strict';

const italianFoods = new Set([
    'pasta',
    'gnocchi',
    'tomatoes',
    'olive oil',
    'garlic',
    'basil',
]);

const mexicanFoods = new Set([
    'tortillas',
    'beans',
    'rice',
    'tomatoes',
    'avocado',
    'garlic',
]);

const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

const openingHours = {
    [weekDays[3]]: {
        open: 12,
        close: 22,
    },
    [weekDays[4]]: {
        open: 11,
        close: 23,
    },
    [weekDays[5]]: {
        open: 0, // Open 24 hours
        close: 24,
    },
}

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    //^ ES6 Enhanced Object Literals
    openingHours,

    //^ Funzioni
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    },

    // Se gli passiamo un oggetto alla funzione, allora dobbiamo racchiudere i parametri in { }
    orderDelivery({ starterIndex = 1, mainIndex = 0, time = "22:00", address }) {
        console.log(`Order recived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderPasta(ing1, ing2, ing3) {
        console.log(`Here's your delicius pasta with: ${ing1}, ${ing2}, ${ing3}`);
    },

    orderPizza(mainIng, ...otherIng) {
        console.log(`The main ingredinet for you pizza is ${mainIng}`);
        console.log(otherIng);
    }
};


//! S9 - L108 | Destructuring arrays []

// const arr = [2, 3, 4]
// const a = arr[0]
// const b = arr[1]
// const c = arr[2]

// Cosi assegna ad ogni "lettera" il numero del array corrispondente, per non ripeterlo 3 volte come sopra
// const [x, y, z] = arr
// console.log(x, y, z);
/*
let [main, , secondary] = restaurant.categories
console.log(main, secondary);

[main, secondary] = [secondary, main]
console.log(main, secondary);

console.log(restaurant.order(2, 0));

const [starter, mainCourse] = restaurant.order(2, 0)
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]]
//const [i, , j] = nested
const [i, , [j, k]] = nested

console.log(i, j, k);

const [p = 1, q = 1, r = 1] = [8, 9]    // I "= 1" e il valore di default se non ce il valoe, in questo caso r sara 1 perche non ce unterzo elemento nell'array
console.log(p, q, r);
*/


//! L9 - S110 | Destructuring objects {}
/*
// Cosi praticamente copio tre elementi che ci nel oggetto ristorante e li copio a tre variabili
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Cosi gli do un altro nome
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

//§ Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//§ Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 }
//({a, b} = obj);
console.log(a, b);

//§ Nasted objects

const { fri: { open: o, close: c } } = openingHours;
console.log(o, c);


restaurant.orderDelivery({
    time: "22:30",
    address: "Via dei Cieli, 89",
    mainIndex: 2,
    starterIndex: 2,
})

restaurant.orderDelivery({
    address: "Via dei Cieli, 89",
    starterIndex: 1,
})
*/

//! L9 - S111 | spreed operator ...
/*
const arr = [7, 8, 9]
const newArr = [...arr, 1, 2, 3]

console.log(newArr);
console.log(...newArr);

// Aggiungiamo un nuovo elemento al main menu creando un nuovo array
const newMenu = [...restaurant.mainMenu, "Gnocchi"]
console.log(...newMenu);

//§ Copy array
const mainMenuCopy = [...restaurant.mainMenu]

//§ Join 2 arrays
const completeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu]

//^ Itarables: arrays, strings, maps, sets. NOT objects
const str = "Viggo"
const letters = [...str, " ", "s"]
console.log(letters);
console.log(...letters);

//§ ------
//const ingredients = [prompt("Let's make pasta! Ingredient 1?"), prompt("Ingredient 2?"), prompt("Ingredient 3?")]
//console.log(ingredients);

//restaurant.orderPasta(...ingredients)   // Cosi gli passo i tre ingredienti che sono nell'array "ingredients"

//§ Obgects
const newResturant = { ...restaurant, founder: "Viggo", foundedIn: "1978" }
console.log(newResturant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Taverna al Paladino"
console.log(restaurant.name, restaurantCopy.name);
*/


//! S9 - L112 | rest
/*
//^ Destructuring
//§ SPREAD operator | Esce gli elementi dall'array
const arra = [1, 2, ...[3, 4]];

//§ REST | Inserisce gli elemeni in un arrray
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood);

const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

//^ Functions
const add = function (...numbers) {
    let sum = 0
    for (let i = 0; i < numbers.length; i++) {
        sum = sum + numbers[i]
    }
    console.log(sum);
    return sum
}

add(2, 3, 4, 5, 6)

const x = [23, 5, 7]
add(...x)       // Bisogna forlo con lo spread perche cosi e come se gli passiamo un numero alla volta


restaurant.orderPizza("salame", "cipolla")
restaurant.orderPizza("tonno")
*/

//! L9 - S113 | && e ||
/*
// Use ANY data type, return ANY data type, short-cirtuting
//^ Ritorna il primo valore thuty
console.log(3 || "Viggo");      // 3
console.log("" || "Viggo");     // Viggo
console.log(true || 0);         // true
console.log(undefined || null); // null

console.log(undefined || 0 || "" || "Ciao" || 23 || null);

// guest1 e guest2 fanno la stessa cosa
const guest1 = restaurant.numGuest ? restaurant.numGuest : 10
console.log(guest1);

const guest2 = restaurant.numGuest || 10

//^ &&
console.log(0 && "Viggo");
console.log(3 && "Viggo");
console.log(23 && null && "viggo");

// l'if e l'&& fanno la stessa cosa, perche tutti e due controllano se restaurant.orderPizza esiste e se esiste fanno...
if (restaurant.orderPizza) {
    restaurant.orderPizza("Saleme", "Olive verdi")
}

restaurant.orderPizza && restaurant.orderPizza("Bresaola", "Radicchio")
*/


//! L9 - S114 || Nullish (null e undefined)
/*
restaurant.numGuest = 0
const guest1 = restaurant.numGuest ? restaurant.numGuest : 10
console.log(guest1);

const guestCorrect = restaurant.numGuest ?? 10
console.log(guestCorrect);
*/


//! L9 - S115 | Logical Assigment Operator
/*
const rest1 = {
    name: "Capri",
    numGuest: 0,
}

const rest2 = {
    name: "Taverna",
    owner: "Marco Rossi"
}

//^ OR Assigment Operator (assegna un valora. a una variabile se il valore di quella variabile e falsy)
// Questi 2 fanno la stessa cosa
// rest1.numGuest = rest1.numGuest || 10;
// rest1.numGuest ||= 10

// rest1.numGuest ||= 10
// rest2.numGuest ||= 10

//^ nullish Assigment Operator
rest1.numGuest ??= 10
rest2.numGuest ??= 10


rest1.owner &&= "<ANONIMO>"
rest2.owner &&= "<ANONIMO>"


console.log(rest1);
console.log(rest2);
*/


//! S9 - L117 | for-of loop
/*
const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu]
// Cosi questo for-of cicla per tutti gli elementi del array menu
for (const item of menu1) {
    console.log(item);
}

// Cosi e per avere un index nel ciclo for-of
for (const [i, el] of menu1.entries()) {
    console.log(`${i + 1}: ${el}`);
}
*/


//! L9 - S119 | Optional chaining ?
/*
if (restaurant.openingHours && restaurant.openingHours.mon) {
    console.log(restaurant.openingHours.mon.open);
}
//§ With optional chaining ?
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

//^ ESEMPIO
for (const day of weekDays) {
    const open = restaurant.openingHours[day]?.open ?? "Closed"
    console.log(`On ${day}, we open at ${open}`);
}

//^ Methods
console.log(restaurant.order?.(0, 1) ?? "Metohd does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Metohd does not exist");

//^ Arrays
const users =  [{name: "Viggo", email: "vpn@gmail.com"}]

console.log(users[0]?.name ?? "User array empty");
*/


//! L9 - S119 | Looping objects
/*
//^ Property NAME
// Con "Object.keys" stampo le chiavi del'oggetto
const properties = Object.keys(openingHours)
console.log(properties);
let openStr = `We are open on ${properties.length}:`

for (const day of properties) {
    openStr += ` ${day},`
}
console.log(openStr);

//^ Property VALUE

const values = Object.values(openingHours)
console.log(values);

//^ Entire Object
const entries = Object.entries(openingHours)
console.log(entries);

for (const [key, {open, close}] of entries) {
    console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/


//! S9 - L121 | Sets (collection of unique values)
/*
const ordersSets = new Set(["Pasta", "Pizza", "Pizza", "Risotto", "Pasta", "Risotto", "Pizza"])

console.log(ordersSets);    // {"Pasta", "Pizza", "Risotto"}
console.log(new Set("Viggo"));      // {"V", "i", "g", "o"}

//§ Controllare se il Set ha un elemento
console.log(ordersSets.size);   // 3
console.log(ordersSets.has("Pizza"));   // true
console.log(ordersSets.has("Bread"));   // false

//§ Aggiungere un elemento dal Set
ordersSets.add("Garlic Bread")
ordersSets.add("Garlic Bread")  // Ne verra aggiunto solo uno
console.log(ordersSets);

//§ Eliminare un elemento dal Set
ordersSets.delete("Risotto")
console.log(ordersSets);

//§ Loop di un Set
for (const order of ordersSets) {
    console.log(order);
}

//^ ESEMPIO - Da un Array a un Set
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]

const staffUnique = [...new Set(staff)] // ["Waiter", "Chef", "Manager"] Traformo l'array staf in un set con valori unici, e poi il risultato lo ritrasformo in un array
console.log(staffUnique);
console.log(new Set(staff).size);   // 3 | Perche ci sono 3 valori unici
*/


//! L9 - S123 | Sets methods
/*
//§ intersection | Stampa i valori che ci sono in tutti e due i Set
const commonFoods = italianFoods.intersection(mexicanFoods)
console.log(commonFoods);       // {"tomatoes", "garlic"}
console.log([...commonFoods]);  // ["tomatoes", "garlic"]


//§ union | Unisce i 2 Set senza duplicati
const itaMexi = italianFoods.union(mexicanFoods);
console.log(itaMexi);   //Set {"pasta", "gnocchi", "tomatoes", "olive oil", "garlic", …}
console.log([...new Set([...italianFoods, ...mexicanFoods])]);  // ["pasta", "gnocchi", "tomatoes", "olive oil", "garlic", "basil", "tortillas", "beans", "rice", "avocado"]

//§ difference | Stampa i valori NON comini di due Set
const uniIta = italianFoods.difference(mexicanFoods);
console.log(uniIta);    // {"pasta", "gnocchi", "olive oil", "basil"}

const uniMexi = mexicanFoods.difference(italianFoods);
console.log(uniMexi);   // {"tortillas", "beans", "rice", "avocado"}

//§ symmetricDifference | Unisce i valori non comuni di due Set in uno solo
const uniItaMexi = italianFoods.symmetricDifference(mexicanFoods)
console.log(uniItaMexi);

//§ isDisjointFrom | Stampa se i 2 Set sono completamentre differenti tra loro (true o false)
console.log(italianFoods.isDisjointFrom(mexicanFoods));     // false
*/


//! L9 - S124 | map
/*
//§ set | Aggiungere elementi ad un map
const rest = new Map();
rest.set("name", "Taverna al Paladino")
rest.set(1, "Taormina, Sicily")
rest.set(2, "Aarhus, Denmark")
console.log(rest);

rest.set("categories", ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set("open", 11)
    .set("close", 24)
    .set(true, "We are open :D")
    .set(false, "We are closed")
console.log(rest);

//§ get | Per ricevere elementi da un map
console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

//§ ----------
const time = 21
console.log(rest.get(time > rest.get("open") && time < rest.get("close")))

//§ delete | Per eliminare un elemento dal map
console.log(rest.has("categories"));
rest.delete(2)
console.log(rest);

//§ size | Per vedere quanti elementi ha
console.log(rest.size);

//§ clear | Per eliminare tutto il contenuto di un map (come nuovo)
// rest.clear()
// console.log(rest);

//§ ----------
const arr = [1, 2]
rest.set(arr, "Test")
console.log(rest);
console.log(rest.get(arr));
rest.set(document.querySelector("h1"), "Heading")
console.log(rest);
*/


//! S9 - L125
/*
const questions = new Map([["question", "In che linguaggio stiamo programmando?"], [1, "C"], [2, "Java"], [3, "JavaScript"], ["correct", 3], [true, "Correct 🎉"], [false, "Try again!"]])

//§ Convertire un oggetto in un Map
const hoursMap = new Map(Object.entries(openingHours))
console.log(hoursMap);

//§ Quiz app
console.log(questions.get("question"));
for (const [key, value] of questions) {
    if (typeof key === "number") {
        console.log(`${key}. ${value}`);
    }
}
const answer = Number(prompt("Your answer"))
console.log(questions.get(answer === questions.get("correct")));

//§ Convertiamo un Map in un Array
console.log([...questions]);
console.log([...questions.keys()]);
console.log([...questions.values()]);
*/


//! S9 - L128
const airline = "ITA Airways"
const plane = "A320"

/*
console.log(airline.length);                // 11
console.log("B747".length);                 // 4
console.log(airline.indexOf("T"));          // 1
console.log(airline.lastIndexOf("a"));      // 8
console.log(airline.indexOf("Airways"));    // 4
console.log(airline.indexOf("airways"));    // -1

console.log(airline.slice(4));      // Airways
console.log(airline.slice(2, 6));   // A Ai

console.log(airline.slice(0, airline.indexOf(" ")));    // ITA
console.log(airline.slice(airline.lastIndexOf(" ") + 1));   // Airways

console.log(airline.slice(-2));     // ys
console.log(airline.slice(1, -1));      // TA Airway


function checkMiddleSeat(seat) {
    const midStr = seat.slice(-1) === "B" || seat.slice(-1) === "E" ? "You have a middle seat!" : "You DON'T have a middle seat"
    console.log(midStr);
}

checkMiddleSeat("11B")
checkMiddleSeat("11A")
checkMiddleSeat("11C")
checkMiddleSeat("11E")
*/


//! L9 - S129
/*
console.log(airline.toLocaleLowerCase());
console.log(airline.toLocaleUpperCase());

//§ toLowerCase, toUpperCase | Fix capitalization in name
const pas = "viGGo"
const pasLow = pas.toLowerCase()
const pasCor = pasLow[0].toUpperCase() + pasLow.slice(1)
console.log(pasCor);

//§ Comparing Emails
const email = "vpn@gmail.com"
const loginEmail = "   VpN@gmAIl.com   "

// const lowEmail = loginEmail.toLowerCase()
// const trimedEmail = lowEmail.trim()
//console.log(trimedEmail);

const norEmail = loginEmail.toLowerCase().trim()
console.log(email === norEmail);

//§ replace, replaceAll

const priceIt = "230,50€";
const priceUs = priceIt.replace(",", ".").replace("€", "$")
console.log(priceIt, priceUs);

const anc = "Boarding at door 13. Boarding at door 13!"
console.log(anc.replaceAll("door", "gate"));
console.log(anc.replace(/door/g, "gate"));

//§ includes
const plane2 = "A320 Neo"
console.log(plane2.includes("A320"));   // true

//§ startsWith, endsWith
console.log(plane2.startsWith("A"));    // true

if (plane2.startsWith("A") && plane2.endsWith("Neo")) {
    console.log("Part of the NEO family");
}


function checkBagage(str) {
    const bagage = str.toLowerCase()
    if (bagage.includes("gun") || bagage.includes("knife")) {
        console.log("You are not alowed on board");
    } else {
        console.log("Welcome aboard!");
    }
}

checkBagage("I have a laptop")
checkBagage("i have a gun")
*/


//! L9 - S130 | Split
/*
console.log("ciao+come+stai+silas".split("+"));
console.log("Viggo Ponturo Nygaard".split(" "));

const [firstName, lastName1, lastName2] = "Viggo Ponturo Nygaard".split(" ")

const newName = ["Mr.", firstName, lastName1, lastName2.toUpperCase()].join(" ")
console.log(newName);


function captName(name) {
    const names = name.split(" ")
    const namesUpper = []
    for (const n of names) {
        // Stessa cosa
        //namesUpper.push(n[0].toUpperCase() + n.slice(1))
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()))
    }
    console.log(namesUpper.join(" "));
}

captName("viggo ponturo nygaard salvatore surto")

//§ padding
const message = "Go to gate 13!"
console.log(message.padStart(15, "-").padEnd(30, "-"));
console.log("Viggo".padStart(15, "-").padEnd(30, "-"));

function maskCreditCard(number) {
    const str = String(number)
    const latsFour = str.slice(-4)
    return latsFour.padStart(str.length, "*")
}

console.log(maskCreditCard(23456788765434567));

//§ repeat
const mes = "Bad weather "
const longMes = mes.repeat(10)
console.log(longMes);
*/


//! S9 - L132

const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


const code = (str) => {
    str.slice(0, 3).toUpperCase()
}

for (const flight of flights.split("+")) {
    const [type, from, to, time] = flight.split(";")
    const output = `${type.startsWith("_Delayed") ? "🛑" : ""} ${type.replaceAll("_", " ")} from ${code(from)} to ${code(to)} (${time.replace(";", "h")})`
    console.log(output);
}
