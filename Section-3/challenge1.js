/*
!CHALLENGE #1
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!

Your tasks:
1. Create an arrow function calcAverage to calculate the average of 3 scores. This function should have three parameters and return a single number (the average score).
2. Create two new variables — scoreDolphins and scoreKoalas, and assign the value returned from the calcAverage function to them (you will need to call this function, and pass scores as arguments).
3. Create a function checkWinner that takes the average score of each team as parameters (avgDolphins and avgKoalas), and then logs the winner to the console, together with the victory points, according to the rule above. Example: Koalas win (30 vs. 13) (use avgDolphins and avgKoalas instead of hard-coded values).
4. Use the checkWinner function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time. Instead, log No team wins... to the console if there is no winner.

TEST DATA 1: Dolphins scored 44, 23, and 71. Koalas scored 65, 54, and 49.
TEST DATA 2: Dolphins scored 85, 54, and 41. Koalas scored 23, 34, and 27.
*/

const calcAverage = (s1, s2, s3) =>  (s1 + s2 + s3) / 3


function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins > avgKoalas * 2) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`)
        return
    } else if(avgKoalas > avgDolphins * 2) {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`)
        return
    } else {
        console.log(`No team wins...`)
        return
    }
}

const scoreDolphins = calcAverage(85, 54, 41)
const scoreKoalas = calcAverage(23, 34, 27)

checkWinner(scoreDolphins, scoreKoalas)



/*
! ESERCITAZIONE

I team Lightning e Thunder partecipano a una gara ciclistica.
Ogni team completa 3 tappe.
Per ogni squadra viene calcolato il tempo medio.
Vince la squadra che ha il tempo medio più basso.
Tuttavia, per vincere, il tempo medio deve essere almeno 10 minuti inferiore rispetto all'altro team.

Your tasks:
- Crea una arrow function calcAverageTime che riceve 3 tempi e restituisce la media.
- Crea due variabili avgLightning e avgThunder.
- Crea una funzione checkWinner che riceve le due medie.
- Se Lightning ha una media almeno 10 minuti inferiore a Thunder, stampa:
  &Lightning win (avgLightning vs. avgThunder)
- Se Thunder ha una media almeno 10 minuti inferiore a Lightning, stampa:
  &Thunder win (avgThunder vs. avgLightning)
- Altrimenti stampa:
  &No team wins...

TEST DATA 1:
Lightning: 120, 115, 118
Thunder: 135, 140, 138

TEST DATA 2:
Lightning: 125, 128, 130
Thunder: 120, 122, 124
*/

const timeAvg = (t1, t2, t3) => (t1 + t2 + t3) / 3

function winningTeam(avgLightning, avgThunder) {
    if (avgLightning < avgThunder && (avgThunder - avgLightning) >= 10) {
        console.log(`Lightning win (${avgLightning} vs. ${avgThunder})`)
        return
    } else if (avgThunder < avgLightning && (avgLightning - avgThunder) >= 10) {
        console.log(`Thunder win (${avgThunder} vs. ${avgLightning})`)
        return
    } else {
        console.log("No team wins...")
        return
    }
} 


const scoreLightning = timeAvg(120, 115, 118)
const scoreThunder = timeAvg(135, 140, 138)

winningTeam(scoreLightning, scoreThunder)