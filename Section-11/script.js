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
};

const account2 = {
  owner: 'Salvatore Curto',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Silas Ponturo Nygaard',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Ofelia Ponturo Nygaard',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

function displayMovements(acc) {
  containerMovements.innerHTML = ""   // Cosi svuota il contenitore

  acc.movements.forEach((mov, i) => {
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
