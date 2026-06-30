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
    '2025-11-18T21:31:17.178Z',
    '2025-12-23T07:42:02.383Z',
    '2026-01-28T09:15:04.904Z',
    '2026-04-01T10:17:24.185Z',
    '2026-05-08T14:11:59.604Z',
    '2026-05-27T17:01:17.194Z',
    '2026-06-27T23:36:17.929Z',
    '2026-06-29T10:51:36.790Z',
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


//* S11-12 - L187 | Progetto banca

function formatMovementsDates(date, locale) {
  const calcDaysPassed = (d1, d2) => Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)

  const daysPassed = Math.round(calcDaysPassed(new Date(), date))
  if (daysPassed === 0) return "Today" 
  if (daysPassed === 1) return "Yesterday" 
  if (daysPassed <= 7) return `${daysPassed} ago` 
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

function formatCur(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency
    }).format(value)
}

function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = ""   // Cosi svuota il contenitore

  const combinedMovDates = acc.movements.map((mov, i) => ({movement: mov, movDate: acc.movementsDates[i]}))
  //console.log(combinedMovDates);

  if (sort) combinedMovDates.sort((a, b) => a.movement - b.movement);
  
  combinedMovDates.forEach((obj, i) => {
    const {movement, movDate} = obj
    const type = movement > 0 ? "deposit" : "withdrawal"

    const calcDaysPassed = (d1, d2) => Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)

    const date = new Date(movDate)
    const displayDate = formatMovementsDates(date, acc.locale)

    // Per formattare il movimento
    const formattedMovement = formatCur(movement, acc.locale, acc.currency)

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMovement}</div>
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
  labelBalance.textContent = `${formatCur(acc.balance, acc.locale, acc.currency)}`
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

  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`
  labelSumOut.textContent = `${formatCur(Math.abs(outcomes), acc.locale, acc.currency)}`
  labelSumInterest.textContent = `${formatCur(interest, acc.locale, acc.currency)}`
}
// calcDisplaySummury(movements)

function startLogOutTimer() {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started"
      containerApp.style.opacity = 0
    }

    time--
  }

  let time = 120

  tick()
  const timer = setInterval(tick, 1000)
  return timer
}

// Event Handelers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1
// updateUI()
// containerApp.style.opacity = 1


//* LOGIN
btnLogin.addEventListener("click", (e) => {
  // Prevent form from submiting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`
    containerApp.style.opacity = 1;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "2-digit",
      year: "numeric"
    }
    //const locale = navigator.language   // it-IT
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

    // Clear fields
    inputLoginUsername.value = inputLoginPin.value = ""
    inputLoginUsername.blur()
    inputLoginPin.blur()    // Cosi il cursore si leva

    // Timer
    if (timer) clearInterval(timer)
    timer = startLogOutTimer()

    updateUI();

  } else {

  }
})

//* TRASFERIRE SOLDI A UN ALTRO ACCOUNT
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const destinationAcc = accounts.find(acc => acc.username === inputTransferTo.value.toLowerCase().trim())
  const amount = Number(inputTransferAmount.value)

  if (amount > 0 && amount <= currentAccount.balance && destinationAcc !== currentAccount?.username && destinationAcc) {
    // Doing the transfer
    currentAccount.movements.push(-amount)
    destinationAcc.movements.push(amount)
    // Add the date
    currentAccount.movementsDates.push(new Date().toISOString())
    destinationAcc.movementsDates.push(new Date().toISOString())
    inputTransferTo.value = inputTransferAmount.value = ""
    inputTransferTo.blur()
    inputTransferAmount.blur()
    updateUI()

    // Reset timer
    clearInterval(timer)
    timer = startLogOutTimer()
  }
})

//* PRESTITO
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value)

  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount)
      // Add the date
      currentAccount.movementsDates.push(new Date().toISOString())
      inputLoanAmount.value = ""
      inputLoanAmount.blur()
      updateUI()
    }, 3000)
  }
  // Reset timer
    clearInterval(timer)
    timer = startLogOutTimer()
})

//* CHIUDERE L'ACCOUNT
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

//* SORT
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
/*
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
*/

//! S12 - L186 | Dates
/*
//§ Create a date
const now = new Date();
console.log(now);     // Tue Jun 30 2026 09:04:17 GMT+0200 (Ora legale dell’Europa centrale)

console.log(new Date("March 01 2004 12:30"));     // Mon Mar 01 2004 12:30:00 GMT+0100 (Ora standard dell’Europa centrale)
console.log(new Date("December 24 2016"));        // Sat Dec 24 2016 00:00:00 GMT+0100 (Ora standard dell’Europa centrale)
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2030, 10, 19, 15, 12, 5));   // Tue Nov 19 2030 15:12:05 GMT+0100 (Ora standard dell’Europa centrale)

console.log(new Date(0));


//§ Working with dates
const future = new Date(2030, 10, 19, 10, 12)
console.log(future);                  // Tue Nov 19 2030 10:12:00 GMT+0100 (Ora standard dell’Europa centrale)
console.log(future.getFullYear());    // 2030
console.log(future.getMonth());       // 10
console.log(future.getDate());        // 19
console.log(future.getDay());         // 2
console.log(future.getHours());       // 10
console.log(future.getMinutes());     // 12
console.log(future.getSeconds());     // 0
console.log(future.toISOString());    // 2030-11-19T09:12:00.000Z
console.log(future.getTime());        // 1921309920000
*/

//! S12 - L189 | Operations with dates
/*
const future = new Date(2030, 10, 19, 10, 12)
console.log(Number(future));

const calcDaysPassed = (d1, d2) => Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)
const days1 = calcDaysPassed(new Date(2030, 10, 19), new Date(2030, 10, 20))
console.log(days1);
*/

//! S12 - L191
/*
const num  = 10500.99
const options = {
  style: "currency",
  unit: "celsius",
  currency: "EUR",
}
console.log(new Intl.NumberFormat("en-US", options).format(num));
console.log(new Intl.NumberFormat("it-IT", options).format(num));
console.log(new Intl.NumberFormat("ar-SY", options).format(num));
*/

//! S12 - L192 | Timers
/*
//§ setTimeOut
const ingredients = ["salame", "gorgonzola"]
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is yur pizza with ${ing1} and ${ing2}🍕`), 3000, ...ingredients)
console.log("Waiting...");

if (ingredients.includes("spinaci")) clearTimeout(pizzaTimer)

//§ setInterval

setInterval(() => {
  const now = new Date()
  console.log(now);
}, 1000)
*/
