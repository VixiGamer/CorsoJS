'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Mario Rossi',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'it-PT', // de-DE
};

const account2 = {
  owner: 'Anna Bianchi',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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
          <div class="movements__value">${mov.toFixed(2)} €</div>
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
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`
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

  labelSumIn.textContent = `${incomes.toFixed(2)} €`
  labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)} €`
  labelSumInterest.textContent = `${interest.toFixed(2)} €`
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
  const loanAmount = Math.floor(inputLoanAmount.value)

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



//! S12 - L181
/*
console.log(13 === 13.0);           // true
console.log(0.1 + 0.2);             // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);     // false

// Conversion
console.log(Number("13"));          // 13
console.log(+"13");                 // 13

// Parsing
console.log(Number.parseInt("30px"), 10);   // 30
console.log(Number.parseInt("px30"), 10);   // NaN

console.log(Number.parseInt("2.5rem"));     // 2
console.log(Number.parseFloat("2.5rem"));   // 2.5

console.log(Number.isNaN(20));                // false
console.log(Number.isNaN("20"));              // false
console.log(Number.isNaN(Number("20px")));    // true
console.log(Number.isNaN(20 / 0));            // false

// Checking if the value is a number
console.log(Number.isFinite(20));               // true
console.log(Number.isFinite("20"));             // false
console.log(Number.isFinite(Number("20px")));   // false
console.log(Number.isFinite(20 / 0));           // false

console.log(Number.isInteger(20));      // true
console.log(Number.isInteger(20.0));    // true
console.log(Number.isInteger("20"));    // false
console.log(Number.isInteger(20 / 0));  // false
*/

//! S12 - L182
/*
//§ Radice quadra
console.log(Math.sqrt(9));    // 3
console.log(9 ** (1 / 2));    // 3

//§ Radice cubica
console.log(8 ** (1 / 3));    // 2

//§ max & min
console.log(Math.max(5, 11, 2, 23, 14, 19, 20, 30));        // 30
console.log(Math.max(5, 11, 2, "23", 14, 19, 20, 30));      // 30
console.log(Math.max(5, 11, 2, "23px", 14, 19, 20, 30));    // NaN

console.log(Math.min(5, 11, 2, 23, 14, 19, 20, 30));        // 2

//§ PI
console.log(Math.PI * Number.parseFloat("10px") ** 2);      // 314.1592653589793

//§ trunc
console.log(Math.trunc(2.3245678909876543));      // 2

//§ random | dado
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
console.log(randomInt(10, 20));

//§ Rounding integars
console.log(Math.round(10.2));    // 10
console.log(Math.round(10.9));    // 11

console.log(Math.ceil("10.2"));    // 11
console.log(Math.ceil(10.9));    // 11

console.log(Math.floor(10.2));    // 10
console.log(Math.floor("10.9"));    // 10

//§ Rounding decimals
//^ toFixed ritorna una STRINGAH NON UN NUMERO
console.log((3.3).toFixed(0));      // 3
console.log((3.8).toFixed(0));      // 4
console.log((3.8456).toFixed(2));   // 3.85
*/

//! S12 - L183
/*
console.log(5 % 2);     // 1
console.log(5 / 2);     // 5 = 2 * 2 + 1

console.log(8 % 3);     // 2
console.log(8 / 3);     // 8 = 2 * 3 + 2

console.log(6 % 2);     // 0

const isEven = n => n % 2 === 0
console.log(isEven(4));     // true
console.log(isEven(7));     // false
console.log(isEven(4.6));   // false


labelBalance.addEventListener("click", () => {
  [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = "orange"     // 0, 2, 4, 6, 8
    if (i % 3 === 0) row.style.backgroundColor = "navy"       // 0, 3, 6, 9, 12
  })
})
*/

//! S12 - L184
/*
const diameter = 287_460_000_000
console.log(diameter);      // 287460000000

const priceCents = 345_99
console.log(priceCents);    // 34599

const n1 = 15_00    // 1500
const n2 = 1_500    // 1500

console.log(Number("150_000"));     // NaN
*/

//! S12 - L185

console.log(2 ** 53 - 1);                 // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER);     // 9007199254740991
console.log(2 ** 53 + 1);                 // 9007199254740992
console.log(2 ** 53 + 2);                 // 9007199254740994
console.log(2 ** 53 + 3);                 // 9007199254740996
console.log(2 ** 53 + 4);                 // 9007199254740996

//§ BigInt
console.log(1234567897654324567898765432356789543245678765432n);
console.log(BigInt(1234567897654324567898765432356789543245678765432));

console.log(10000n + 10000n);     // 20000n
console.log(4545455454545454454554544545454545545445n * 13241234312n);      // 60187440728394827887280879910805172112713089308840n

const huge = 453267897654367899098765n
const num = 13
//console.log(huge + num);          //! TypeError: Invalid mix of BigInt and other type in addition
console.log(huge + BigInt(num));    // 453267897654367899098778n

// Exeptions
console.log(20n > 15);              // true
console.log(20n === 20);            // false
console.log(typeof 20n);            // bigint
console.log(20n == 20);             // true

console.log(huge + " is  a BIG number!");   // 453267897654367899098765is  a BIG number!
//console.log(Math.sqrt(25n));                //! TypeError: Conversion from 'BigInt' to 'number' is not allowed

// Division
console.log(10n / 3n);      // 3n
console.log(10 / 3);        // 3.3333333333333335