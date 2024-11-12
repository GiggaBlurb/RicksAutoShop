// Retrieve the current user's index and user data from localStorage
const userIndex = localStorage.getItem("currentUser");
let userArray = JSON.parse(localStorage.getItem("RegistrationData")) || [];
let cart;

// Check if `userArray` exists, has an entry at `userIndex`, and contains a `cart` object
if (userArray && userArray[userIndex] && userArray[userIndex].cart) {
    // Set `cart` to the user's existing cart if it exists
    cart = userArray[userIndex].cart;
} else {
    // Otherwise, assign a default empty cart structure
    cart = { servicelist: [], total: 0 };
}

// Function to display cart items on the page
function renderCartItems() {
    const cartTableBody = document.getElementById("itemsInCart");
    cartTableBody.innerHTML = ""; // Clear any existing items
    let header;

    if (Object.keys(cart.servicelist).length !== 0) {
        header = `
        <th>Service Name</th>
        <th>Service Cost</th>
        <th>Service Discount</th>
        <th>Service Tax</th>
        <th>Service Total</th>
        <th>Remove Service Total</th>`;

    }
    else {
        header = '<th>No Service Selected</th>'
    }

    cartTableBody.innerHTML = header;


    // Loop through each item in the cart's servicelist array and display it
    cart.servicelist.forEach((service, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            
            <td>${service.name}</td>
            <td>$${service.cost.toFixed(2)}</td>
            <td>$${service.discount.toFixed(2)}</td>
            <td>$${service.tax.toFixed(2)}</td>
            <td>$${(service.cost - service.discount + service.tax).toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    updateTotal(); // Update the total display
}

// Function to calculate and update the total price displayed in the cart
function updateTotal() {
    let totalPrice = 0;
    cart.servicelist.forEach(item => {
        totalPrice += item.cost - item.discount + item.tax;
    });
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}


// Function to remove an item from the cart
function removeItem(index) {
    let prodDetails = cart.servicelist[index];
    cart.totalDiscount -= prodDetails.discount;
    cart.totalTax -= prodDetails.tax;
    cart.subTotal -= prodDetails.cost;
    cart.total -= (prodDetails.cost + prodDetails.tax) - prodDetails.discount;
    cart.servicelist.splice(index, 1); // Remove selected item from service list

    saveCartData(); // Save updated cart to localStorage
    renderCartItems(); // Refresh cart display
}

// Function to clear all items from the cart
function cartClear() {
    cart.servicelist = []; // Empty the cart's service list
    cart.totalDiscount = 0;
    cart.totalTax = 0;
    cart.subTotal = 0;
    cart.total =0; 
    saveCartData();
    renderCartItems();
}

// Function to save the cart data back to localStorage
function saveCartData() {
    userArray[userIndex].cart = cart;
    localStorage.setItem("RegistrationData", JSON.stringify(userArray));
}

// Function to handle checkout by saving cart to an invoice and redirecting
function cartCheckout() {
    ocalStorage.setItem("RegistrationData", JSON.stringify(userArray));
    window.location.href = "checkout.html";
}

// Function to close cart and return to the homepage
function cartClose() {
    window.location.href = "homePage.html";
}

// Initialize the cart on page load
window.onload = renderCartItems;
