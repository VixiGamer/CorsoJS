//! S17 - L284
/*
// Importing module
//^ Named export '{ nome }' | Defalut export 'nome'
//import { addToCart, totalPrice as price, tq } from "./shoppingCart.js"

console.log("Importing module");
// Console Log
// Exporting Module
// Importing module

//console.log(shippingCost);  //! ReferenceError: Can't find variable: shippingCost

addToCart("Pesche", 5)
console.log(price, tq);

//^ Import all the exporting of a module all at the same time
import * as ShoppingCart from "./shoppingCart.js"

ShoppingCart.addToCart("Pane", 2)
console.log(ShoppingCart.totalPrice);

*/
//^ Import the default export from 'Shopping Cart'
import add, { cart } from "./shoppingCart.js"   //! Di solito non si mischiano gli input tra defalt e nemed exports
//!! IMPORTS ARE NOR THE COPY OF THE EXPORTS, THEY ARE INSTED LIKE A LIFE CONNECTION. THEY POINT IN THE SAME PLACE IN MEMORY

add("pizza", 2)
add("pane", 1)
add("pesche", 10)

console.log(cart); // [{product: "Pane", quantity: 2}, {product: "pizza", quantity: 2}, {product: "pane", quantity: 1}, {product: "pesche", quantity: 10}]


//! S17 - L285 | Top-Level await (senza async)
/*
// console.log("START FETCHING");
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
// const data = await res.json()
// console.log(data);
// console.log("FINISH FETCHING");

async function getLastPost() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await res.json()
    return { title: data.at(-1).title, text: data.at(-1).body }
}

const lastPost = getLastPost()
//console.log(getLastPost());     // Promise {status: "pending"}

//lastPost.then(lp => console.log(lp))      // Funziona ma non e pulito (e poi non mi piace)

const lastPost2 = await getLastPost()       // Cosi e molto piu pulito e intuitivo
console.log(lastPost2);
*/

//! S17 - L286 | The module pattern
/*
const ShoppingCart2 = (function(params) {
    const cart = []
    const shippingCost = 10
    const totalPrice = 128
    const totalQuantity = 14

    function addToCart(product, quantity) {
        cart.push({product, quantity})
        console.log(`${quantity} ${product} has been added to cart`);
    }

    function orderStock(product, quantity) {
        cart.push({product, quantity})
        console.log(`${quantity} ${product} ordered from supplier`);
    }

    return {
        addToCart, 
        cart, 
        totalPrice, 
        totalQuantity
    }
})()

ShoppingCart2.addToCart("pizza", 2)
ShoppingCart2.addToCart("sorbetto", 4)
console.log(ShoppingCart2);                 // {addToCart: function, cart: [{product: "pizza", quantity: 2}, {product: "sorbetto", quantity: 4}], totalPrice: 128, totalQuantity: 14}
console.log(ShoppingCart2.shippingCost);    // undefined
*/

//! S17 - L287 | CommonJS Module
/*
// Export
export.addToCart = function(product, quantity) {
    cart.push({product, quantity})
    console.log(`${quantity} ${product} has been added to cart`);
}

// Import
const { addToCart } = require("./shoppingCart.js")
*/

//! S17 - L289 | NPM (Node Package Manenger)
/*
import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

const state = {
    cart: [
        {product: "Pizza", quantity: 3},
        {product: "Sorbetto Limone", quantity: 2},
        {product: "Brownee", quantity: 1},
    ],
    user: { loggedIn: true }
}

const stateClone = Object.assign({}, state)
const stateDeepClone = cloneDeep(state)

state.user.loggedIn = false

console.log(stateClone);        // ... user: {loggedIn: false}}
console.log(stateDeepClone);    // ... user: {loggedIn: true}}
*/

//! S17 - L290
/*
import { cloneDeep } from "lodash-es";      // Troverà pracel il resto dell'indirizzo

if (module.hot) {
    module.hot.accept()
}
//^ Praticamente vul dire: “Se modifico questo modulo mentre il server è acceso, aggiorna solo questo file senza ricaricare tutta la pagina.”
*/

