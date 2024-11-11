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

function renderCartItems() {
    const cartTableBody = document.getElementById("itemsInCart");
    cartTableBody.innerHTML = ""; // Clear any existing items

	// Loop through each item in the cart's servicelist array and display it
    cart.servicelist.forEach((service, index) => {
       
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("formContent");
        itemContainer.innerHTML = `
            <p><strong>Service:</strong> ${service.name}</p>
            <p><strong>Price:</strong> $${service.cost.toFixed(2)}</p>
            <p><strong>Discount:</strong> $${service.discount.toFixed(2)}</p>
            <p><strong>Tax:</strong> $${service.tax.toFixed(2)}</p>
            <p><strong>Total:</strong> $${(service.cost - service.discount + service.tax).toFixed(2)}</p>
            <input type="number" value="1" min="1" onchange="updateQuantity(${index}, this.value)" />
            <button onclick="removeItem(${index})" class="buttonAction">Remove</button>
        `;

        cartTableBody.appendChild(itemContainer);
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

// Function to handle quantity changes and update totals
function updateQuantity(index, quantity) {
    const item = cart.servicelist[index];
    const originalCost = item.cost / quantity; // Calculate original cost
    item.cost = originalCost * quantity; // Adjust cost by new quantity
    item.discount = item.discountRate * item.cost;
    item.tax = item.cost * 0.15; // Assuming tax rate is 15%
    renderCartItems(); // Re-render the cart items with updated totals
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.servicelist.splice(index, 1); // Remove selected item
    saveCartData(); // Save updated cart to localStorage
    renderCartItems(); // Refresh cart display
}

// Function to clear all items from the cart
function cartClear() {
    cart.servicelist = []; // Empty the cart's service list
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
    localStorage.setItem("invoice", JSON.stringify(cart.servicelist));
    window.location.href = "checkout.html";
}

// Function to close cart and return to the homepage
function cartClose() {
    window.location.href = "homePage.html";
}

// Initialize the cart on page load
window.onload = renderCartItems;
