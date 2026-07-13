// Exporting module

console.log("Exporting Module");


// Bloccking code
// console.log("Start fetching users");
// const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
// const data = await res.json()
// console.log("Finished fetching users");


const shippingCost = 10
export const cart = []


export function addToCart(product, quantity) {
    cart.push({product, quantity})
    console.log(`${quantity} ${product} has been added to cart!`);
}

const totalPrice = 237
const totalQuantity = 24

export { totalPrice, totalQuantity as tq }


//^ We use 'Default Export' when we only want to export one thing per module
export default function (product, quantity) {
    cart.push({product, quantity})
    console.log(`${quantity} ${product} has been added to cart! 2`);
}