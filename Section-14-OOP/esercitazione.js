/*
Your tasks:
    1. Create a class called 'Car' with the properties 'brand', 'model' and 'year'.
        Add a public field called 'country' with the value 'Italy' and a private field '#mileage' initialized to 0.

    2. Implement the methods 'displayInfo()', 'calcAge()', and 'drive(km)'. 
        The 'drive(km)' method must increase the mileage, reject negative values, log the updated information, 
        and return 'this' to support method chaining.

    3. Add a getter and setter for 'mileage'. The setter must reject negative values.

    4. Implement a static method 'compareYears(car1, car2)' that compares two cars and logs which one is newer,
        or if both were built in the same year.

    5. Create a class 'ElectricCar' that extends 'Car', adds a 'battery' property,
        a 'charge(percent)' method, and overrides 'displayInfo()'.

    6. Create a class 'Garage' with a private array '#cars', methods 'addCar(car)',
        'removeCar(model)', 'showCars()', a getter 'totalCars', and a static method 'garageInfo()'.

    7. Create the required objects and test all methods, including chaining with an ElectricCar.

Bonus:
    > Implement 'findCar(model)'.
    > Implement 'oldCars()'.
    > Implement 'sortCarsByYear()'.
    > Prevent 'drive(-20)' from changing the mileage.
    > Create a 'SportsCar' class that extends 'Car' with a 'maxSpeed' property and a 'turbo()' method.
*/


class Car {
    country = "Italy";
    #mileage = 0;

    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model} ${this.year}`);
        return this
    }

    calcAge() {
        console.log(`Your ${this.brand} Model ${this.model} is ${2026 - this.year} years old`);
        return this
    }

    drive(km) {
        if (km > 0) {
            this.#mileage = this.#mileage + km
            console.log(`I km nella ${this.brand} Model ${this.model} sono stati aumentati a ${this.#mileage}`);
        } else console.log("km non validi");
        return this
    }

    get mileage() {
        console.log(`Your ${this.brand} Model ${this.model} has ${this.#mileage} km`);
        return this.#mileage
    }

    set mileage(km) {
        if (km < 0) {
            console.log("km non validi");
            return
        }
        this.#mileage = km
    }

    static compareYears(car1, car2) {
        if (car1.year > car2.year) {
            console.log(`${car1.brand} Model ${car1.model} (${car1.year}) is newer than ${car2.brand} Model ${car2.model} (${car2.year})`);
        } else if (car2.year > car1.year) {
            console.log(`${car2.brand} Model ${car2.model} (${car2.year}) is newer than ${car1.brand} Model ${car1.model} (${car1.year})`);
        } else {
            console.log(`${car2.brand} Model ${car2.model} (${car2.year}) and ${car2.brand} Model ${car2.model} (${car2.year}) came out the same year!`);
        }
    }
}


class ElectricCar extends Car {
    constructor(brand, model, year, battery){
        super(brand, model, year)
        this.battery = battery
    }

    charge(percent) {
        if (percent > 0) {
            if (percent > this.battery) {
                return this.battery = percent
            }
        } else return
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model} ${this.year} - ${this.battery}%`);
        return this
    }

}


class SportsCar extends Car {
    constructor(brand, model, year, maxSpeed) {
        super(brand, model, year);
        this.maxSpeed = maxSpeed;
    }

    turbo() {
        console.log(`Stai guidando a ${this.maxSpeed * 1.5} km/h`);
    }
}


class Garage {
    #cars = []

    addCar(car) {
        this.#cars.push(car)
        return this
    }

    removeCar(brand, model) {
        const index = this.#cars.findIndex(car => car.brand === brand && car.model === model)
        if (index >= 0) {
            this.#cars.splice(index, 1)
        }
        return this
    }

    showCars() {
        console.log("Macchine presenti nel garage:");
        this.#cars.forEach(car => {
            if (car.battery) {
                console.log(` > ${car.brand} ${car.model} ${car.year} - ${car.battery}%`);
            } else {
                console.log(` > ${car.brand} ${car.model} ${car.year}`);
            }
        });
    }

    // Bonus
    findCar(model) {
        if (this.#cars.find(car => car.model === model)) {
            console.log("Macchina presente nel garage");
        } else console.log("Macchina inesistente");
    }

    oldCars() {
        this.#cars.forEach(car => {
            if (car.year <= 2000) {
                console.log(` > ${car.brand} ${car.model} (${car.year}) is an old car`);
            }
        });
    }

    sortCarsByYear() {
        const sortedCars = this.#cars.slice().sort((a, b) => a.year > b.year)
        sortedCars.forEach(car => {
            if (car.battery) {
                console.log(` > ${car.brand} ${car.model} ${car.year} - ${car.battery}%`);
            } else {
                console.log(` > ${car.brand} ${car.model} ${car.year}`);
            }
        });
    }

    get totalCars() {
        return this.#cars.length
    }

    static garageInfo() {
        console.log(`This is a garage :)`);
    }
}


const car1 = new Car("Citroen", "C3", 2010)
const car2 = new Car("Audi", "Z1", 2016)

const car3 = new ElectricCar("Tesla", "X", 2023, 75)
const car4 = new ElectricCar("Ravien", "Z", 2025, 95)
const car5 = new ElectricCar("Ferrari", "Testarossa", 1960)

const sportCar1 = new SportsCar("Lamborghini", "Urus", 2025, 230)

car1.displayInfo()
car1.calcAge()
car1.drive(9).drive(10)
Car.compareYears(car1, car2)

car4.displayInfo()
car4.calcAge()
car4.drive(9).drive(10)
Car.compareYears(car3, car4)

const garage = new Garage();

garage.addCar(car1).addCar(car2).addCar(car3).addCar(car4).addCar(car5)
garage.showCars()
garage.removeCar("Citroen", "C3")
console.log(garage.totalCars);
garage.showCars()

Garage.garageInfo()

garage.findCar("X")
garage.oldCars()
garage.sortCarsByYear()

sportCar1.turbo()