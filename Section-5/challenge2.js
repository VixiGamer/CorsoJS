"use strict";

const data1 = [7.5, 8, 6.5, 0, 8.5, 4, 0]

function work(arr) {
    const weekDays = ["Lunedi",  "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];
    let totH = 0
    let daysWorked = 0
    let dayMostH = 0

    //Total hours worked
    for (let i = 0; i < arr.length; i++) {
        totH = totH + arr[i]
        if (arr[i] !== 0) daysWorked++
    }

    // Avarage daily hours
    const avgDaylyH = totH / daysWorked

    const fullTime = totH > 35

    // The day with the most hours worked
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[dayMostH]) {
            dayMostH = i
        }
    }

    const dayMostHoursWorked = weekDays[dayMostH]

    return {
        totHours: totH,
        avgDaylyHours: avgDaylyH.toFixed(1),
        dayMostHours: dayMostHoursWorked,
        numberWorkDays: daysWorked,
        fullTime: fullTime
    }
}

console.log(work(data1));