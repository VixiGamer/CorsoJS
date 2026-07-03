'use strict';

//! S14 - L221-222-224
/*
//§ Constuctor function
function Person(firstName, birthYear) {
    //console.log(this);      // {}
    //& Instance properties
    this.firstName = firstName
    this.birthYear = birthYear

    // Non fare mai (perche cosi a tutti gli oggetti che vengono creati avrannno questa funzione)
    // this.calcAge = function () {
    //     console.log(2026 - this.birthYear);
    // }
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


//§ Prototype - S222
console.log(Person.prototype);
//^ Facciamo cosi invece di metterla nel oggetto, come sopra, perché cosi ce ne sarà solo 1 di funzione
Person.prototype.calcAge = function () {
    console.log(2026 - this.birthYear);
}

viggo.calcAge();
silas.calcAge();

console.log(viggo.__proto__);
console.log(viggo.__proto__ === Person.prototype);      // true
console.log(Person.prototype.isPrototypeOf(viggo));     // true
console.log(Person.prototype.isPrototypeOf(silas));     // true
console.log(Person.prototype.isPrototypeOf(marco));     // false

Person.prototype.species = "Homo Sapiens"       // Aggiungo un parametro a Person.prototype, ovvero "species"
console.log(viggo);         // Person {firstName: "Viggo", birthYear: 2004, calcAge: function, species: "Homo Sapiens"}
console.log(viggo.hasOwnProperty("firstName"));     // true (perché e dentro Person)
console.log(viggo.hasOwnProperty("species"));       // false (perché e dentro Person.prototype)

//§ S224
console.log(viggo.__proto__);                       // Person {calcAge: function, species: "Homo Sapiens"}
console.log(viggo.__proto__.__proto__);             // {}
console.log(viggo.__proto__.__proto__.__proto__);   // null

console.dir(Person.prototype.constructor);

const arr = [3, 3, 5, 6, 6, 6, 9, 1, 9]         // new Array === []
console.log(arr.__proto__ === Array.prototype);     // true
console.log(Object.getOwnPropertyNames(Array.prototype));   // Cosi ricevo tutti i nomi dei suoi metodi

//^ Qui sto praticamente creando un nuovo metodo degli array e lo sto aggiungendo al prototype degli array
Array.prototype.unique = function () {
    return [...new Set(this)]
}
console.log(arr.unique());          // [3, 5, 6, 9, 1]


const h1 = document.querySelector("h1");
console.dir(h1);
console.dir(x => x + 1);
*/

//! S14 - L226 | ES6 Classes
/*
//§ Class expression
// const PersonCl = class {  }

//§ Class declaration
class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    //^ Le funzioni che scrivo qua sono nel .prototype, non nel oggetto in se stesso
    calcAge() {
        console.log(2026 - this.birthYear);
    }
}

const viggo = new PersonCl("Viggo", 2004)
viggo.calcAge();
console.log(viggo.__proto__ === PersonCl.prototype);        // true

//^ Posso aggiungere anche le funzioni dopo cosi come prima e verranno aggiunte al .prototype
PersonCl.prototype.greet = function () {
    console.log(`Ciao, mi chiamo ${this.firstName}`);
}
viggo.greet();      // Ciao, mi chiamo Viggo


// 1. Classes are NOT hoisted ()
// 2. Classes are first-class citizes
// 3. Classes are executed in strict-mode
*/

//! S14 - L227 | Getter e Setter
/*
const account = {
    owner: "Viggo",
    movements: [200, 530, 120, 300, 1300],

    get latest() {
        return this.movements.slice(-1).pop()
    },

    set latest(mov) {
        this.movements.push(mov)
    }
}

console.log(account.latest);        // 1300

account.latest = 50
console.log(account.movements);


class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    //^ Le funzioni che scrivo qua sono nel .prototype, non nel oggetto in se stesso
    calcAge() {
        console.log(2026 - this.birthYear);
    }

    greet() {
        console.log(`Ciao, mi chiamo ${this.fullName}`);
    }

    get age() {
        return 2026 - this.birthYear 
    }

    // Set a property that allready exist
    set fullName(name) {
        if (name.includes(" ")) this._fullName = name
        else alert(`${name} is not a full name!`)
    }
    
    get fullName() {
        return this._fullName
    }
}

const viggo = new PersonCl("Viggo Ponturo Nygaard", 2004)       // PersonCl {_fullName: "Viggo Ponturo Nygaard", birthYear: 2004} 
console.log(viggo.age);     // 22

const silas = new PersonCl("Salvatore", 2003)       // PersonCl {birthYear: 2003}
*/

//! S14 - L228 | Static Methods
/*
    I metodi statici in JavaScript sono metodi che appartengono
    alla classe stessa, non agli oggetti (istanze) creati con quella classe.
*/
/*
class Person {
  constructor(name) {
    this.name = name;
  }

  // Instance Method (metodo normale) 
  greet() {
    console.log(`Ciao, sono ${this.name}`);
  }

  // 2. Static Method (metodo statico)
  static info() {
    console.log("Le persone hanno un nome e una data di nascita");
  }
}

// 1. Static Method (metodo statico)
Person.info = function () {
    console.log("Le persone hanno un nome e una data di nascita");
}

const p1 = new Person("Viggo");

p1.greet();         // ✅ funziona (istanza)
p1.info();          //! TypeError: p1.info is not a function. (In 'p1.info()', 'p1.info' is undefined)
Person.info();      // ✅ corretto (classe)
*/

//! S14 - L229 | Object.create
/*
// This object is going to be the prototype of all the Person object
const PersonProto = {
    calcAge() {
        console.log(2026 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }
}

const viggo = Object.create(PersonProto)
console.log(viggo);     // {calcAge: function}
viggo.name = "Viggo"
viggo.birthYear = 2004
viggo.calcAge()         // 22

console.log(viggo.__proto__ === PersonProto);       // true

const silas = Object.create(PersonProto);
silas.init("Silas", 2007)
silas.calcAge()
*/

//! S14 - L231 | Inheritance between Classes: Constuctor function
/*
function Person(firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
}
Person.prototype.calcAge = function () {
    console.log(2026 - this.birthYear);
}

const Student  = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)     // Copio le prorprieta di Person (NON i metodi)
    this.course = course
}

// "Gli oggetti creati con Student devono anche avere accesso ai metodi di Person"
Student.prototype = Object.create(Person.prototype)     //^ “Se un metodo non esiste in Student, cerca in Person.prototype”, dove ce il metodo "calcAge"
// Se non facciamo questo "mike.calcAge()" non funzionerebbe

Student.prototype.intoduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student("Mike", 2000, "Computer Science")
mike.intoduce()
mike.calcAge()

console.log(mike.__proto__);                // {intoduce: function, calcAge: function}
console.log(mike.__proto__.__proto__);      // {calcAge: function}


console.dir(Student.prototype.constructor);
// VVVVVVVVVVVVV
// function Person(firstName, birthYear) {
//     this.firstName = firstName
//     this.birthYear = birthYear
// }



Student.prototype.constructor = Student
console.dir(Student.prototype.constructor);
// VVVVVVVV
// function (firstName, birthYear, course) {
//     Person.call(this, firstName, birthYear)
//     this.course = course
// }


console.log(mike instanceof Student);       // true
console.log(mike instanceof Person);        // true
*/

//! S14 - L233 | Inheritance between Classes: ES6 Classes
/*
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge() {
        console.log(2026 - this.birthYear);
    }

    greet() {
        console.log(`Ciao, mi chiamo ${this.fullName}`);
    }

    get age() {
        return 2026 - this.birthYear
    }

    // Set a property that allready exist
    set fullName(name) {
        if (name.includes(" ")) this._fullName = name
        else alert(`${name} is not a full name!`)
    }

    get fullName() {
        return this._fullName
    }

    static hey() {
        console.log("Hey there 👋🏻");
    }
}


class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        super(fullName, birthYear)
        this.course = course
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    calcAge() {
        console.log(`I'm ${2026 - this.birthYear}, but i fell like ${(2026 - this.birthYear) + 10}`);
    }

}

const viggo = new StudentCl("Viggo Ponturo Nygaard", 2004, "C.S.")
viggo.introduce()
viggo.calcAge()
*/

//! S14 - L234 | Inheritance between Classes: Object.create
/*
const PersonProto = {
    calcAge() {
        console.log(2026 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }
}

const mike = Object.create(PersonProto);

//§ Qui e dove accade l'ereditarietà
const StudentProto = Object.create(PersonProto)

//^ Costruttore
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}


const viggo = Object.create(StudentProto)
viggo.init("Viggo", 2004, "C.S.");
viggo.introduce()
viggo.calcAge()
*/

//! S14 - L235-236-237 | Another class example - Data Encapsulation e Data Privacy - Chaining Methods
/*
//& L235-236
class Account {
    //§ 1. Public fileds
    locale = navigator.language;
    bank = "Bankist";

    //§ 2. Private fields
    #movements = [];
    #pin        //^ Qui creao la variabbile ma non la assegno a niente


    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;        //^ Ora l'assegno al valore che gli da l'utente

        //this.movements = [];                  // Lo tolgiamo da qui e lo mettiamo provato sopra
        //this.locale = navigator.language;     // Questo e sarebbe pure un Public filed, non cambia niente tra questo e quello di sopra

        console.log(`Thanks for opening an account ${owner}`);
    }

    //§ 3. Public methods
    get getMovements() {
        return this.#movements;
        // Non si puo concatenare
    }

    deposit(mov) {
        this.#movements.push(mov)
        return this     // return this serve cosi puoi concatenare i metodi, .deposit(300).withdraw(100)...
    }

    withdraw(mov) {
        this.deposit(-mov)
        return this
    }

    //§ 4. Private methods
    #aproveLoan(val) {
        return true
    }

    requestLoan(val) {
        if (this.#aproveLoan(val)) {
            this.deposit(val)
            console.log("Loan approved");
        }
        return this
    }
}

const acc1 = new Account("Viggo", "EUR", 1212)
console.log(acc1);      // Account {owner: "Viggo", currency: "EUR", pin: 1212, movements: [], locale: "it-IT"}

acc1.deposit(250)
acc1.withdraw(50)
console.log(acc1);      // Account {owner: "Viggo", currency: "EUR", pin: 1212, movements: [250, -50], locale: "it-IT"}
console.log(acc1.pin);  //! 1212 | NON SI DOVREBBE VEDERE

acc1.requestLoan(1000)
console.log(acc1);
//acc1.aproveLoan(900)    //! NON SI DOVREBBE POTERE ACCEDERE
//console.log(acc1.#movements);       //! SyntaxError: Cannot reference undeclared private names: "#movements"


//& L237

const movements = acc1.deposit(300).withdraw(100).withdraw(50).requestLoan(25000).withdraw(4000).getMovements
console.log(movements)
*/

