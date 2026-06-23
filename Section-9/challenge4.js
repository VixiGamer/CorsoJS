/*
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.

Test data (pasted to textarea, including spaces):
    underscore_case
    first_name
    Some_Variable
    calculate_AGE
    delayed_departure

Should produce this output (5 separate console.log outputs):
    underscoreCase ✅
    firstName ✅✅
    someVariable ✅✅✅
    calculateAge ✅✅✅✅
    delayedDeparture ✅✅✅✅✅


Hints:
    > Remember which character defines a new line in the textarea 😉
    > The solution only needs to work for a variable made out of 2 words, like a_b
    > Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
    > This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
*/


const data = ["underscore_case", "first_name", "Some_Variable", "calculate_AGE", "delayed_departure"]

function camelCase(data) {
    let newData = []
    let newCammelWords = []
    let newDataComplete = []
    for (const s of data) {
        const lowerArr = s.toLowerCase().split("_")
        //console.log(lowerArr);
        for (const elAr of lowerArr) {
            const firstLetterUp = elAr.replace(elAr[0], elAr[0].toUpperCase())
            newCammelWords.push(firstLetterUp)
            //console.log(firstLetterUp);
        }
        newData.push(newCammelWords)
        newCammelWords = []
    }
    for (const str of newData) {
        newDataComplete.push(str.join(""))
    }
    for (const s of newDataComplete) {
        console.log(s);
    }
    //console.log(newDataComplete);
}

camelCase(data);