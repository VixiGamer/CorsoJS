"use strict";

const data1 = [17, 21, 23]
const data2 = [12, 5, -5, 0, 4]

function printForecast(arr) {
    let cs = ""
    for (let i = 0; i < arr.length; i++) {
        cs = cs + `${arr[i]}°C in ${i + 1} days... `
    }
    return cs
}

console.log(printForecast(data1));
console.log(printForecast(data2));