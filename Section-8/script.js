'use strict';

//! L8 - S97 | Scope practice
/*
function calcAge(birthYear) {
    const age = 2026 - birthYear;
    console.log(firstName)

    function printAge() {
        const output = `${firstName} you are ${age} years old. Born in ${birthYear}`
        console.log(output);
        if (birthYear >= 1981 && birthYear <= 1996) {
            const str = `Oh, and you arte a millenial ${firstName}`
            console.log(str);

            function add(a, b) {
                return a + b
            }
        }
    }
    printAge()

    return age
}

const firstName = "Viggo"   
calcAge(2004)
*/


//! L8 - S99
/*
// Varriabili
console.log(me);    // undefined
//console.log(job);   // Cannot acces "job" before initialization
//console.log(year);  // Cannot acces "year" before initialization

var me = "Viggo"
let job = "Programmatore"
const year = 2004

// Funzioni

console.log(addDecl(2, 3));     // 5
console.log(addExpr(1, 1));     // Cannot access 'addExpr' before initialization
console.log(addArrow(5, 5));    // Cannot access 'addArrow' before initialization.

function addDecl(a, b) {
    return a + b
}

const addExpr = function (a, b) {
    return a + b
}

var addArrow = () => a + b
*/


//! L8 - S101
/*
console.log(this);

function calcAge(birthYear) {
    console.log(2026 - birthYear);
    console.log(this);
}
calcAge(2004)

const calcAgeArrow = (birthYear) => {
    console.log(2026 - birthYear);
    console.log(this);
}
calcAgeArrow(2004)

const viggo = {
    year: 2004,
    calcAge: function () {
        console.log(this);
        console.log(2026 - this.year);
    }
}
viggo.calcAge();


const silas = {
    year: 2007,
}
silas.calcAge = viggo.calcAge;  // Function borrowing
silas.calcAge()


const f = viggo.calcAge;

f();    // undefined
*/


//! L8 - S102
/*
var firstName = "Silas"
const viggo = {
    firstName: "Viggo",
    year: 2004,
    calcAge: function () {
        console.log(this);
        console.log(2026 - this.year);
        const isMill = () => {
            console.log(this.year >= 1981 && this.year <=1986);
        }
        isMill();
    },
    greet: () => {
        console.log(this);
        console.log(`Hey ${this.firstName}`)
    }
}

viggo.greet();

viggo.calcAge();
*/


//! L8 - S104
/*
const viggo = {
    firstName: "Viggo",
    lastName: "Ponturo Nygaard",
    age: 22,
};

const mariedViggo = viggo   // Sia viggo che marriedViggo puntano allo stesso oggetto
mariedViggo.lastName = "Ponturo Nygaard Curto"
console.log(viggo.lastName);
console.log(mariedViggo.lastName);

function mariedPerson(person, newLastName) {
    person.lastName = newLastName
    return person
}

const mariedViggo2 = mariedPerson(viggo, "Ponturo Nygaard Curto")
console.log(viggo);
console.log(mariedViggo2);


const viggo2 = {
    firstName: "Viggo",
    lastName: "Ponturo Nygaard",
    age: 22,
    family: ["Silas", "Ofelia"] 
};

const viggo2Copy = { ...viggo}

viggo2Copy.lastName = "Ponturo Nygaard Curto"
console.log(viggo2, viggo2Copy);

// Deep clone

const viggoClone = structuredClone(viggo2)
viggoClone.family.push("Andrea")
console.log(viggoClone, viggo2);
*/


