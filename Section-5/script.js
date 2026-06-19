"use strict";

//! S5 - L61
/*
const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

function tempAmplitude1(temperatures) {
    
    let max = temperatures[0]
    let min = temperatures[0]
    for (let i = 0; i < temperatures.length; i++) {
        if (typeof temperatures[i] !== "number") continue // Il continue dice di non passare aventi con il codice e percio passa al prossimo elemento dell'array
        if (temperatures[i] > max) {
            max = temperatures[i]
        }
        if (temperatures[i] < min) {
            min = temperatures[i]
        }
    }
    console.log(max, min);
    return max - min
}

const amlpitude = tempAmplitude1(temperatures)
console.log(amlpitude);


function tempAmplitude2(t1, t2) {
    const temperatures = t1.concat(t2);
    
    let max = temperatures[0]
    let min = temperatures[0]
    for (let i = 0; i < temperatures.length; i++) {
        if (typeof temperatures[i] !== "number") continue // Il continue dice di non passare aventi con il codice e percio passa al prossimo elemento dell'array
        if (temperatures[i] > max) {
            max = temperatures[i]
        }
        if (temperatures[i] < min) {
            min = temperatures[i]
        }
    }
    console.log(max, min);
    return max - min
}


tempAmplitude2([8, 5, 9], [1, 3, 4]);
*/


//! S5 - L63
/*
const mesureKelvin = () => {
    const mesurement = {
        type: "temp",
        unit: "celcius",
        value: Number(prompt("Degress celcius: "))
    }
    const kelvin = mesurement.value + 273;
    return kelvin
}

console.log(mesureKelvin()); 
*/