"use strict";
/*
!CHALLENGE #2
Steven wants you to improve his tip calculator, using the same rules as before — tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
Your tasks:
    1. Write a function calcTip that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from the first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
    2. And now let's use arrays! So, create an array called bills containing the test data below.
    3. Create an array called tips containing the tip value for each bill, calculated from the function you created before.

BONUS: Create an array totals containing the total values, so the bill + tip.
TEST DATA: 125, 555, and 44.
*/

const calcTip = bill => bill >= 50 && bill <= 300 ? bill * (15 / 100) : bill * (20 / 100);

const bills = [125, 555, 44]
const tips = new Array();
const totals = new Array();

tips.push(calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]))
console.log(tips)

totals.push(bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2])
console.log(totals)



/*
Una compagnia di noleggio auto applica le seguenti regole:

* Se il noleggio dura tra 1 e 7 giorni, il costo è 40€ al giorno.
* Se il noleggio dura più di 7 giorni, il costo è 35€ al giorno.

I tuoi compiti

1. Scrivi una funzione calcRentalCost che riceve il numero di giorni e restituisce il costo totale del noleggio.
2. Prova la funzione con un noleggio di 5 giorni.
3. Crea un array chiamato rentals contenente i seguenti dati: [3, 10, 7]
4. Crea un array chiamato costs che contenga il costo di ogni noleggio calcolato tramite la funzione.
BONUS 
Crea un array chiamato discountedCosts:
1. Se il costo totale supera 300€, applica uno sconto del 10%.
1. Altrimenti lascia il costo invariato.
*/



function calcRentalCost(duration) {
    if (duration >= 1 && duration <= 7) {
        return duration * 40
    } else {
        const tot = duration * 35
        if (tot >= 300) {
            const discount = tot * 0.1
            const newTot = tot - discount
            return newTot
        } else {
            return  tot
        }
    }
}

const rentals = [3, 10, 7]
const costs = new Array()
const discountedCosts = new Array()

costs.push(calcRentalCost(rentals[0]), calcRentalCost(rentals[1]), calcRentalCost(rentals[2]))
console.log(costs)