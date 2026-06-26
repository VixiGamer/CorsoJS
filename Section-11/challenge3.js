'use strict';
/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!

Test data:
 > Data 1: [5, 2, 4, 1, 15, 8, 3]
 > Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

//! CHALLENGE 2
/*
    function calcAverageHumanAge(ages) {
        const dogsAgeConvertor = ages.map(age => age <= 2 ? age * 2 : 16 + age * 4)
        console.log(dogsAgeConvertor);

        const dogsAgeFilter = dogsAgeConvertor.filter(age => age >= 18)
        console.log(dogsAgeFilter);

        const dogsHumanAgeAvg = dogsAgeConvertor.reduce((acc, cur) => acc + cur, 0) / dogsAgeConvertor.length
        console.log(dogsHumanAgeAvg);
    }
*/

const calcAverageHumanAge = ages => ages.map(age => age <= 2 ? age * 2 : 16 + age * 4).filter(age => age >= 18).reduce((acc, age, i, arr) => acc + age / arr.lenght, 0)

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));