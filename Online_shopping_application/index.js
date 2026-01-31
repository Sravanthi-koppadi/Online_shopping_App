//elements references
// Elements references
const productrow = document.getElementById("product-row");
const cardcontainer = document.getElementById("cardcontainer");
const feedback = document.getElementById("feedback");
const clearcart = document.getElementById("clearcart");
const sortbyprice = document.getElementById("sortbyprice");

// Default products
const products = [
    { id: 1, name1: "Laptop", price: 50000 },
    { id: 2, name1: "Phone", price: 20000 },
    { id: 3, name1: "Tablet", price: 5000 },
    { id: 4, name1: "Smartwatch", price: 1000 },
    { id: 5, name1: "Headphones", price: 500 }
];

let cart = []; // Use let so we can reassign it easily
let timer;

// Listeners
clearcart.addEventListener('click', clearfromcart);
sortbyprice.addEventListener('click', sortcart);

// 1. Render Initial Product List
function rendorproductdetails() {
    productrow.innerHTML = ""; // Clear existing
    products.forEach(function(product) {
        const { id, name1, price } = product;
        const divelement = document.createElement("div");
        divelement.className = "product-row";
        divelement.innerHTML = `
            <p>${name1} :- Rs.${price}</p>
            <button onclick="addtoCart(${id})">Add to cart</button>
        `;
        productrow.appendChild(divelement);
    });
}

// 2. Render Cart Items
function rendorcart() {
    cardcontainer.innerHTML = "";
    cart.forEach(function(product) {
        const { id, name1, price } = product;
        const carditem = `
            <div class="product-row">
                <p>${name1} - Rs.${price}</p>
                <button onclick="removefromcart(${id})">remove</button>
            </div>`;
        cardcontainer.insertAdjacentHTML("beforeend", carditem);
    });

    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById("totalprice").textContent = `Total: Rs. ${total}`;
}

// 3. Add to Cart Logic
function addtoCart(id) {
    const isincart = cart.some(product => product.id === id);
    const productToAdd = products.find(product => product.id === id);

    if (isincart) {
        updateuserfeedback(`${productToAdd.name1} already in cart`, "error");
        return;
    }

    cart.push(productToAdd);
    rendorcart();
    updateuserfeedback(`${productToAdd.name1} added to cart`, "succes");
}

// 4. Remove from Cart Logic (Simplified)
function removefromcart(id) {
    const removedProduct = cart.find(p => p.id === id);
    cart = cart.filter(product => product.id !== id); // Reassigning the filtered array
    
    rendorcart();
    if (removedProduct) {
        updateuserfeedback(`${removedProduct.name1} removed`, "error");
    }
}

function clearfromcart() {
    cart = [];
    rendorcart();
    updateuserfeedback('Cart cleared', "succes");
}

function sortcart() {
    cart.sort((a, b) => a.price - b.price);
    rendorcart();
}

function updateuserfeedback(msg, type) {
    clearTimeout(timer);
    feedback.style.display = "block";
    feedback.style.backgroundColor = type === "succes" ? "green" : "red";
    feedback.textContent = msg;

    timer = setTimeout(() => {
        feedback.style.display = "none";
    }, 3000);
}

// Initialize
rendorproductdetails();
rendorcart(); // Run this once to show "Total: 0"
