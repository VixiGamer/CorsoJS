'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Viggo Ponturo Nygaard',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium"
};

const account2 = {
  owner: 'Salvatore Curto',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "premium"
};

const account3 = {
  owner: 'Silas Ponturo Nygaard',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "standard"
};

const account4 = {
  owner: 'Ofelia Ponturo Nygaard',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic"
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


//* S11 - L154-158-160 a 167 | Inizio progetto banca

function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = ""   // Cosi svuota il contenitore

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal"

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov} €</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html)   // Con questo inserisco ogni movimento

  });
}
// displayMovements(account1.movements)

function createUsernames(accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner.toLowerCase().split(" ").map(n => n[0]).join("")
  });
}
createUsernames(accounts)

function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`
}
// calcDisplayBalance(account1.movements)

function updateUI(acc = currentAccount) {
  // Display movements
  displayMovements(acc)

  // Display balance
  calcDisplayBalance(acc)

  // Display summury
  calcDisplaySummury(acc)
}


function calcDisplaySummury(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  const interest = acc.movements.filter(mov => mov > 0).map(dep => dep * acc.interestRate / 100).filter(int => int >= 1).reduce((acc, int) => acc + int, 0)

  labelSumIn.textContent = `${incomes} €`
  labelSumOut.textContent = `${Math.abs(outcomes)} €`
  labelSumInterest.textContent = `${interest} €`
}
// calcDisplaySummury(movements)

// Event Handelers
let currentAccount;

btnLogin.addEventListener("click", (e) => {
  // Prevent form from submiting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`
    containerApp.style.opacity = 1;

    // Clear fields
    inputLoginUsername.value = inputLoginPin.value = ""
    inputLoginUsername.blur()
    inputLoginPin.blur()    // Cosi il cursore si leva

    updateUI();

  } else {

  }
})


btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const destinationAcc = accounts.find(acc => acc.username === inputTransferTo.value.toLowerCase().trim())
  const amount = Number(inputTransferAmount.value)

  if (amount > 0 && amount <= currentAccount.balance && destinationAcc !== currentAccount?.username && destinationAcc) {
    // Doing the transfer
    currentAccount.movements.push(-amount)
    destinationAcc.movements.push(amount)
    inputTransferTo.value = inputTransferAmount.value = ""
    inputTransferTo.blur()
    inputTransferAmount.blur()
    updateUI()
  }
})

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value)

  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
    currentAccount.movements.push(loanAmount)
    inputLoanAmount.value = ""
    inputLoanAmount.blur()
    updateUI()
  }
})

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin && currentAccount.balance === 0) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)   // Cosi trova l'index dell'account nel'array

    // Elimino l'account
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0;
    inputClosePin.value = inputClosePin.value = ""
  }
})

let sorting = false
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorting);
  sorting = !sorting
})


//! S11 - L149 | Symple array methods
/*
let arr = ["a", "b", "c", "d", "e"]

//§ Slice | NON modifica l'array opriginale
console.log(arr.slice(2));      // ["c", "d", "e"]
console.log(arr.slice(2, 4));   // ["c", "d"]
console.log(arr.slice(-2));     // ["d", "e"]
console.log(arr.slice(1, -2));  // ["b", "c"]
console.log(arr.slice());       // ["a", "b", "c", "d", "e"]

//§ Splice | Modifica l'array originale
//console.log(arr.splice(2));     // ["c", "d", "e"]
arr.splice(-1)
console.log(arr);

//§ Reverse | Inverte e mdofica l'array origginale
arr = ["a", "b", "c", "d", "e"]
const arr2 = ["j", "i", "h", "g", "f"]
console.log(arr2.reverse());    // ["f", "g", "h", "i", "j"]
console.log(arr2);              // ["f", "g", "h", "i", "j"]

//§ Concact | Unisce 2 array in uno solo
const letters = arr.concat(arr2)
console.log(letters);           // ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

//§ Join
console.log(letters.join(" - ")); // a - b - c - d - e - f - g - h - i - j
*/


//! S11 - L150 | New AT method
/*
const arr = [13, 11, 64]
console.log(arr[0]);      // 13
console.log(arr.at(0));   // 13

//§ Getting last array element
console.log(arr[arr.length - 1]);   // 64
console.log(arr.slice(-1)[0]);      // 64
console.log(arr.at(-1));            // 64
console.log(arr.at(-2));            // 11

console.log("Viggo".at(-1));        // o
*/


//! S11 - L151 | Looping arrays: forEach
/*
//for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log("---------- FORE EACH ----------");
movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
*/

//! S11 - L152 | forEach with Maps and Sets
/*
//§ Map
currencies.forEach((el, i, map) => {
  console.log(`${i}: ${el}`);
});

//§ Set

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "GBP", "EUR"])
console.log(currenciesUnique);

currenciesUnique.forEach((el, _, set) => {
  console.log(`${el}: ${el}`);
});
*/

//! S11 - L157
/*
const eurToUsd = 1.1

const movementsUsd = movements.map(mov => mov * eurToUsd)

console.log(movements);
console.log(movementsUsd);

const movementsDesc = movements.map((mov, i) => `Movements ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`)

console.log(movementsDesc);
*/

//! S11 - L159 | filter
/*
const deposits = movements.filter(mov => mov > 0)
const withdrawal = movements.filter(mov => mov < 0)

console.log(deposits, withdrawal);
*/

//! S11 - L160 | reduce
/*
const balance = movements.reduce((acc, curr, i, arr) => { return acc + curr }, 0)    // Lo 0 e il valore iniziale del accumulatore
console.log(balance);

const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc
  } else {
    return mov
  }
}, movements[0])

console.log(max);
*/

//! S11 - L162
/*
const totDepositUSD = movements.filter(mov => mov > 0).map(mov => mov * 1.1).reduce((acc, mov) => acc + mov, 0)
console.log(totDepositUSD);
*/

//! S11 - L164 | find
/*
const firstWithdrawal = movements.find(mov => mov < 0)
console.log(firstWithdrawal);

const accountX = accounts.find(acc => acc.owner === "Jessica Davis")
console.log(accountX);
*/

//! S11 - L168
/*
console.log(movements);

// Ritorna il primo elemento che soddisfa la condizione partedo dalla fine dell'array
const lastW = movements.findLast(mov => mov < 0)
console.log(lastW);

const lastLargeMovementIndex = movements.findLastIndex(mov => Math.abs(mov) > 1000)
console.log(`Your lates large ammount was ${movements[lastLargeMovementIndex]}`);
*/

//! S11 - L169 | some & every
/*
console.log(movements);
console.log(movements.includes(-130));    // Cerca se ce l'elemento nell'array
console.log(movements.some(mov => mov > 0));    // Controlla se ci sono elementi che soddisfano la condizione
console.log(movements.every(mov => mov > 0));   // Controlla se TUTTI gli elementi dell'array soddifano la condizione

// Seperate callback
const deposit = mov => mov > 0

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

//! S11 - L170 | flat & flatMap
/*
//§ flat
const arr = [[1, 2, 3], [4, 5, 6], 7, 8]
console.log(arr.flat());    // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8]
console.log(arrDeep.flat(2));   // Il 2 e il livello di indentazione

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat()
console.log(allMovements);

const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0)
console.log(overallBalance);

//§ flatMap
// Il flatMap e praticamente il metodo map ma alla fine fa il flat,
// ma se hai bisogno di piu di un livello di indentazione, allora li devi svolgere separati
const overallBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
console.log(overallBalance2);
*/

//! S11 - 172 | Sorting Arrays
/*
//§ Stringhe
const owners = ["Viggo", "Silas", "Ofelia", "Louise", "Giuseppe"]
console.log(owners.sort());
console.log(owners);

//§ Numeri
console.log(movements);

console.log(movements.sort((a, b) => a - b));   // [-650, -400, -130, 70, 200, 450, 1300, 3000]
console.log(movements.sort((a, b) => a > b));   // [-650, -400, -130, 70, 200, 450, 1300, 3000]

console.log(movements.sort((a, b) => b - a));   // [-650, -400, -130, 70, 200, 450, 1300, 3000]
console.log(movements.sort((a, b) => a < b));   // [3000, 1300, 450, 200, 70, -130, -400, -650] 
*/

//! S11 - L173 | Array grouping
/*
console.log(movements);
const groupedMovements = Object.groupBy(movements, mov => mov > 0 ? "deposit" : "withdrawl")

  // Qui praticamnete stiamo creando un oggetto (JSON), dove come chiavi sono il valore che gli ritorniamo.
  // In questo caso le chiavi sono "deposit" e "withdrawl". Percio dentro questo Oggetto vedremmo
  // 2 chiavi con ciascuno un array con dei valori che in questo caso se il movimento e magiore di 0, allora va
  // nel array dei "deposit", invece se e minore di 0, va nel array dei "withdrawl"

  // {
  //   deposit: [200, 450, 3000, 70, 1300],
  //   withdrawl: [-400, -650, -130]
  // }


console.log(groupedMovements);

const groupedByActivity = Object.groupBy(accounts, acc => {
  const movCount = acc.movements.length;
  if (movCount >= 8) return "very active"
  if (movCount >= 4) return "just active"
  if (movCount >= 1) return "moderate active"
  return "inactive"
})

console.log(groupedByActivity);

const groupedByType = Object.groupBy(accounts, acc => acc.type)
// Qui invece stiamo creando una chiave per ogni tipo di valore che ha "type" in ogni account
console.log(groupedByType);
*/

//! S11 - L174
/*
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const x = new Array(7)
console.log(x);   // [] (7)

//§ fill
// Sostituisce tutti o schegli da dove iniziare e dove finire, in un valore che vuoi
x.fill(1)
arr.fill(23, 2, 6)
console.log(x);       // [1, 1, 1, 1, 1, 1, 1]
console.log(arr);     // [1, 2, 23, 23, 23, 23, 7, 8, 9] 

//§ Array.from
const y = Array.from({length: 7}, () => 1)
console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1)
console.log(z);


labelBalance.addEventListener("click", () => {
  const movementsUi = Array.from(document.querySelectorAll(".movements__value"), el => el.textContent.replace("€", ""))
  console.log(movementsUi);
})
*/

//! S11 - L175 | toReversed, toSorted, toSpliced
/*
//^ Creano un nuovo array basati sui dati di quelli originali

console.log(movements);
//§ toReversed (reverse)
//const reversedMov = movements.slice().reverse();    //? Prima
const reversedMov = movements.toReversed();    //& Dopo
console.log(reversedMov);

//§ toSorted (sort), toSpliced (splice)
//^ "toSorted" fa la stessa cosa di "sort" e "toSpliced" fa la stessa cosa di "splice",
//^ MA ATTENZIONE, quando utiliziamo "sort" e "splice", modifica l'array originale.
//^ Invece "toSorted" e "toSpliced", insieme ovviamente a "toReversed", creano un nuovo array basato sui dati del originale.

//* ----------------------

const newMovements = movements.with(1, 2000)
//^ Cosi stiamoi dicendo che volgiamo un nuovo array di movements, che pero l'elemento a indice uno sia 2000
//^ Cosi non modifichiamo l'array originale
console.log(movements);
console.log(newMovements);
*/

//! S11 - L177

// 1
//const bankDepositSum = accounts.map(acc => acc.movements).flat()
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
console.log(bankDepositSum);

// 2
//const bankBigDeposits = accounts.flatMap(acc => acc.movements).filter(mov => mov > 1000).length
const bankBigDeposits = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => mov > 1000 ? acc + 1 : acc, 0)
console.log(bankBigDeposits);

// 3
const sums = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => {
  mov > 0 ? acc.deposits += mov : acc.withdrawl += mov
  return acc
}, {deposits: 0, withdrawl: 0})
console.log(sums);

// 4
function convertTitleCase(title) {
  const exeptions = ["a", "ad", "al", "alla", "allo", "ai", "agli", "alle", "da", "dal", "dalla", "dallo", "dei", "degli", "delle", "di", "e", "ed", "il","lo", "la", "i", "gli", "le", "in", "nel", "nella", "nei", "negli", "nelle", "o", "od", "per", "su", "sul", "sulla", "tra", "fra", "con"]

  const titleCase = title.toLowerCase().split(" ").map(word => exeptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)).join(" ")
  return titleCase
}

console.log(convertTitleCase("mi chiamo viggo e ho 22 anni e vivo a taormina"));