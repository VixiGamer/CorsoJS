/*
!CHALLENGE #3
Let's go back to Mark and John comparing their BMIs!
This time, let's use objects to implement the calculations! Remember: BMI = mass / (height * height) (mass in kg and height in meters).

Your tasks:
1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith). Name these objects as mark and john, and their properties exactly as fullName, mass and height.
2. Create a calcBMI method on each object to calculate the BMI (the same method on both objects). Assign the BMI value to a property called bmi (lowercase), and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!".

TEST DATA: Marks weighs 78 kg and is 1.69 m tall. John weighs 92 kg and is 1.95 m tall.
*/

const mark = {
    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height)
        return this.bmi
    }
}

const john = {
    fullName: "John Smith",
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height)
        return this.bmi
    }
}

if (mark.calcBMI() > john.calcBMI()) {
    console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`)
} else {
    console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`)
}



/*
!ESERCITAZIONE

Esercizio: Confronto della Velocità Media
Due ciclisti, Alice e Bob, hanno percorso una certa distanza in un determinato tempo.
Dati:
- Alice ha percorso 120 km in 4 ore.
- Bob ha percorso 150 km in 5 ore.

Task

1. Crea due oggetti chiamati alice e bob.
2. Ogni oggetto deve avere le proprietà:
    * fullName
    * distance
    * time
3. Aggiungi a ciascun oggetto un metodo chiamato calcSpeed.
4. Il metodo deve:
    * calcolare la velocità media;
    * salvarla in una proprietà chiamata speed;
    * restituire il valore calcolato.
5. Confronta le velocità dei due ciclisti.
6. Stampa nella console chi è più veloce usando un messaggio come:
    Alice Johnson's speed (30) km/h is higher than Bob Wilson's speed (25) km/h!
Bonus
Aggiungi un terzo else per stampare: Alice Johnson and Bob Wilson have the same speed (30 km/h)!
*/

const alice = {
    fullName: "Alice Johnson",
    distance: "120",
    time: 4,
    calcSpeed: function () {
        this.speed = this.distance / this.time
        return this.speed
    }
}

const bob = {
    fullName: "Bob Wilson",
    distance: "150",
    time: 5,
    calcSpeed: function () {
        this.speed = this.distance / this.time
        return this.speed
    }
}

if (alice.calcSpeed() > bob.calcSpeed()) {
    console.log(`${alice.fullName}'s speed (${alice.speed} km/h) is higher than ${bob.fullName}'s speed (${bob.speed} km/h)!`)
} else if (bob.speed > alice.speed) {
    console.log(`${bob.fullName}'s speed (${bob.speed} km/h) is higher than ${alice.fullName}'s speed (${alice} km/h)!`)
} else if (alice.speed === bob.speed) {
    console.log(`${alice.fullName}'s speed and ${bob.fullName}'s speed are the same (${alice.speed} km/h)!`)
}