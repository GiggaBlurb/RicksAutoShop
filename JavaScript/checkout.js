window.onload = function () {
    const page = document.getElementsByTagName('body')[0].id;
    if (page === 'checkoutPage') {
        displayCartSummary();
    }
};

// Display cart summary
function displayCartSummary() {
    const userIndex = localStorage.getItem("currentUser");
    const userArray = JSON.parse(localStorage.getItem("RegistrationData"));
    const currentUser = userArray[userIndex];
    const cart = currentUser.cart.servicelist;

    const table = document.getElementById("Invoice");
    let subTotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    // Populate the table with cart items
    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.cost.toFixed(2)}</td>
            <td>$${item.discount.toFixed(2)}</td>
            <td>$${item.tax.toFixed(2)}</td>
            <td>$${(item.cost - item.discount + item.tax).toFixed(2)}</td>
        `;
        table.appendChild(row);

        subTotal += item.cost;
        totalDiscount += item.discount;
        totalTax += item.tax;
    });

    // Display totals
    document.getElementById("subTotal").innerText = `$${subTotal.toFixed(2)}`;
    document.getElementById("totalTax").innerText = `$${totalTax.toFixed(2)}`;
    document.getElementById("totalDiscount").innerText = `$${totalDiscount.toFixed(2)}`;
    document.getElementById("GrandTotal").innerText = `${(subTotal + totalTax - totalDiscount).toFixed(2)}`;
    document.getElementById("date").innerText = new Date().toLocaleDateString();
}

// Confirm checkout and save invoice
function confirmCheckout() {
    const userIndex = localStorage.getItem("currentUser");
    const userArray = JSON.parse(localStorage.getItem("RegistrationData"));
    const currentUser = userArray[userIndex];
    
    const invoiceData = {
        date: new Date().toLocaleDateString(),
        items: currentUser.cart.servicelist,
        total: currentUser.cart.total
    };
    
    // Add this invoice to the user's invoices
    currentUser.invoices.push(invoiceData);
    
    // Clear the cart
    currentUser.cart.servicelist = [];
    currentUser.cart.total = 0;
    
    // Update localStorage
    userArray[userIndex] = currentUser;
    localStorage.setItem("RegistrationData", JSON.stringify(userArray));
    
    alert("Checkout successful! Your invoice has been saved.");
    window.location.href = "homePage.html";
}

// Cancel and return to cart page
function cancelCheckout() {
    
    window.location.href = "cartPage.html";
}

