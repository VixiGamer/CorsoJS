'use strict';

/*
Your tasks:
    1. Use a constructor function to implement an Electric Car (called 'EV') as a child
    "class" of 'Car'. Besides a make and current speed, the 'EV' also has the
    current battery charge in % ('charge' property);

    2. Implement a 'chargeBattery' method which takes an argument
    'chargeTo' and sets the battery charge to 'chargeTo';

    3. Implement an 'accelerate' method that will increase the car's speed by 20,
    and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
    km/h, with a charge of 22%';

    4. Create an electric car object and experiment with calling 'accelerate',
    'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
    you 'accelerate'!;

Hint: Review the definiton of polymorphism 😉 <=== “Hai ridefinito accelerate nella classe figlia → questo è polimorfismo.”

Test data:
    > Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/

//^ Presa dalla challenge 1
function Car(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed = this.speed + 10
    console.log(`${this.make} going at ${this.speed}km/h`);
}
Car.prototype.brake = function () {
    this.speed = this.speed - 5
    console.log(`${this.make} going at ${this.speed}km/h`);
}

//§ Creo la classe figlia di Car, ovvero EV
function EV(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

//§ Qui gli dico di prendere i metodi di Car
EV.prototype = Object.create(Car.prototype)

//§ Qui creo i suoi metodi, NON accessibbili da Car
EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo
    console.log(`${this.make}'s battery has been chargend up to ${chargeTo}%`);
}

//& Questo accelerate sovrascrive quello di Car perché ovviamente trova prima questo (accelerate di EV)
//& E quasi lo stesso discorso per il break lo cerca prima in EV, e siccome non lo trova lo va a cerca in Car e li lo trova e poercio usa quello
EV.prototype.accelerate = function () {
    this.speed = this.speed + 20
    this.charge--
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
}

const elCar1 = new EV("Tesla", 120, 23)

elCar1.accelerate()         // Tesla going at 140 km/h, with a charge of 22%
elCar1.accelerate()         // Tesla going at 160 km/h, with a charge of 21%
elCar1.accelerate()         // Tesla going at 180 km/h, with a charge of 20%
elCar1.brake()              // Tesla going at 175km/h
elCar1.chargeBattery(90)    // Tesla's battery has been chargend up to 90%
elCar1.accelerate()         // Tesla going at 195 km/h, with a charge of 89%