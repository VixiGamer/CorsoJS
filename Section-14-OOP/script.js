'use strict';

//! S14 - L221

//§ Constuctor function
function Person(firstName, birthYear) {
    //console.log(this);      // {}
    //& Instance properties
    this.firstName = firstName
    this.birthYear = birthYear

    // Non fare mai
    this.calcAge = function () {
        console.log(2026 - this.birthYear);
    }
}

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} is leanked to a prototype
// 4. function automatically return {}

//& viggo, silas e salvatore sono un instanza di Person
const viggo = new Person("Viggo", 2004)
console.log(viggo);     // Person {firstName: "Viggo", birthYear: 2004}

const silas = new Person("Silas", 2007)
const salvatore = new Person("Salvatore", 2003)
console.log(silas, salvatore);

const marco = "Marco"

//& Qui controllo se viggo e marco sono un instanza di Person
console.log(viggo instanceof Person);       // true
console.log(marco instanceof Person);       // false

