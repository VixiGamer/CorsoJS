'use strict';

const users = [
  { fullName: "  mario Rossi ", age: 28, workouts: [45, 60, 30], plan: "premium" },
  { fullName: "LUCA bianchi", age: 35, workouts: [20, 30], plan: "basic" },
  { fullName: " Giulia Verdi", age: 24, workouts: [60, 90, 45, 60], plan: "premium" },
  { fullName: "anna Neri", age: 41, workouts: [], plan: "basic" },
  { fullName: " marco Gialli ", age: 30, workouts: [50, 50, 50], plan: "basic" }
];

/*
TASK 1: Pulizia dei dati (Stringhe & Array)
Cicla sull'array 'users'. Per ogni utente, prendi la proprietà 'fullName', 
rimuovi gli spazi vuoti all'inizio e alla fine, e dividila in due nuove 
proprietà: 'firstName' e 'lastName'. 
Assicurati che i nomi siano formattati correttamente (es. "Mario" e "Rossi" 
con solo la prima lettera maiuscola e il resto minuscolo). 
Infine, elimina la vecchia proprietà 'fullName' dall'oggetto.
*/


users.forEach(user => {
    const cleanNameSurname = user.fullName.trim().toLowerCase().split(" ").map(word => word[0].toUpperCase() + word.slice(1))
    user.firstName = cleanNameSurname[0]
    user.lastName = cleanNameSurname[1]
    delete user.fullName
    //console.log(users);
});


/*
TASK 2: Calcolo dei totali (Array)
Cicla di nuovo sull'array aggiornato. Calcola i minuti totali di allenamento 
per ogni utente (sommando i valori nell'array 'workouts') e aggiungi questo 
valore come nuova proprietà 'totalMinutes'. Modifica direttamente gli oggetti esistenti.
*/

users.forEach(user => {
    user.totalMinutes = user.workouts.reduce((acc, curr) => acc + curr, 0)
});
console.log(users);


/*
TASK 3: Ricerca specifica (Array & Stringhe)
Trova l'utente il cui 'firstName' inizia con la lettera "G" e fai un 
console.log per stampare se ha un piano premium o no, in questo formato: 
"Giulia ha un piano premium: true" 🤓
*/

users.forEach(user => {
    if (user.firstName.charAt(0) === "G") {
        console.log(`${user.firstName} ha un piano premium: ${user.plan === "premium" ? true : false}`)
    }
});



/*
TASK 4: Filtri e Mappature (Array)
Crea un nuovo array chiamato 'activeUsersNames' che contenga SOLO i nomi 
di battesimo ('firstName') degli utenti che si sono allenati per più di 100 minuti totali.
*/


const activeUsersNames = users.filter(user => user.totalMinutes > 100).map(user => user.firstName)
console.log(activeUsersNames);


/*
TASK 5: Formattazione dell'output (Array & Stringhe)
Fai un console.log di una singola stringa per presentare l'array creato 
al punto 4, in questo modo: "I nostri utenti più attivi sono: Mario, Giulia e Marco." 
(Nota: unisci i nomi con una virgola e uno spazio, e possibilmente gestisci 
l'ultimo elemento con una "e" se vuoi una sfida extra).
*/


const printStr = activeUsersNames.slice(0, activeUsersNames.length - 1).join(", ") + " e " + activeUsersNames[activeUsersNames.length - 1]
console.log(`I nostri utenti più attivi sono: ${printStr}`);


/*
TASK 6: Condizioni generali (Array)
Fai un console.log (solo true o false) per verificare se c'è almeno un 
utente che non si è mai allenato (zero minuti totali).
*/


console.log(users.some(user => user.totalMinutes === 0));


/*
TASK 7: Condizioni rigorose (Array)
Fai un console.log (solo true o false) per verificare se tutti gli 
utenti "premium" hanno superato i 150 minuti totali di allenamento.
*/


console.log(users.every(user => user.plan === "premium" && user.totalMinutes > 150));


/*
TASK 8: Copia e Ordinamento (Array)
Crea una copia superficiale (shallow copy) dell'array 'users', filtralo 
per tenere solo gli utenti "basic", e poi ordinalo in base all'età in 
ordine decrescente (dal più grande al più piccolo). Fai un console.log del risultato. 😉
*/


const copyUsers = users.slice().filter(user => user.plan === "basic").sort((a, b) => b.age - a.age);
console.log(copyUsers);