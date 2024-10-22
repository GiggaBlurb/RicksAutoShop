//Norman Martin-2300232
//Tutor:Sirisha Badhika

let totalCost = 0;
let totalTax = 0;
const taxRate = .15;
let Cart = [];

window.onload = function () {

    const page = document.getElementsByTagName('body')[0].id;

    if (page == 'loginPage') {

        let attemps = 0;
        const form = document.getElementById('loginForm');

        form.addEventListener("submit", function (event) {
            const name = 'Norman';
            const password = 'Norman123'
            const username = document.getElementById('name').value;
            const userpassword = document.getElementById('password').value;
            const Message = document.getElementById('Message');
            event.preventDefault();

            if (name == username && password == userpassword) {
                displayMessage("Login is Succesfull", "green")
                window.location.href = "./webpages/homePage.html";
            }
            else {
                displayMessage("Login is Unsuccesfull", "red")
                attemps++;
            }

            if (attemps == 3) {
                window.location.href = "./webpages/errorPage.html";
            }

            function displayMessage(message, color) {
                Message.innerHTML = message;
                Message.style.color = color;
            }
        });

    }

    if (page == 'servicePage') {

        const Services = document.getElementsByClassName('serviceContent');

        for (let index = 0; index < Services.length; index++) {

            let cost = Services[index].getElementsByClassName('cost');

            let name = Services[index].getElementsByClassName('name');
            let check = Services[index].getElementsByClassName('checkmark');
            let tax = Services[index].getElementsByClassName('tax')[0];

            let subtotal = Services[index].getElementsByClassName('subtotal')[0];
            let TotalCost = document.getElementById('TotalCost');

            for (let subindex = 0; subindex < check.length; subindex++) {

                check[subindex].addEventListener("click", function (e) {

                    var sub = parseFloat(subtotal.innerHTML);
                    if (isNaN(sub)) {
                        sub = 0;
                        var serviceTax = 0;
                    }

                    let sname = name[subindex].innerHTML;
                    var serviceCost = parseFloat(cost[subindex].innerHTML.replace('$', ''));

                    if (check[subindex].checked == true) {
                        sub = sub + serviceCost;
                        totalCost += serviceCost;
                        Cart.push(sname, serviceCost);

                    }
                    else {
                        sub = sub - serviceCost;
                        totalCost -= serviceCost;
                        Cart.splice(Cart.indexOf(sname), 2);
                    }
                    serviceTax = (sub * taxRate);
                    totalTax = (totalCost * taxRate)
                    tax.innerHTML = serviceTax;
                    subtotal.innerHTML = sub;
                    TotalCost.innerHTML = totalCost + totalTax;
                });

            }


        }

    }
    if (page == 'checkoutPage') {

        let invoice = JSON.parse(localStorage.getItem('invoice'));

        let date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        let dateplace = document.getElementById('date');
        let subplace = document.getElementById('subTotal');
        let taxplace = document.getElementById('totalTax');
        let discountplace = document.getElementById('totalDiscount');
        let Gtotalplace = document.getElementById('GrandTotal');
        const table = document.getElementById('Invoice');
        let sub = 0;

        for (let num = 0; num < invoice.length; num += 2) {

            table.innerHTML += '  <tr class="name"><td> <p>' + invoice[num] + '</p>  </td> <td><p class="cost">$' + invoice[num + 1] + '</p> </td> </tr>';
            sub += invoice[num + 1];
        }
        let totalTax = sub * taxRate;
        let totalDiscount = sub * .05;
        let grandTotal = (sub + totalTax) - totalDiscount;

        dateplace.innerHTML = date;
        subplace.innerHTML = sub;
        taxplace.innerHTML = totalTax
        discountplace.innerHTML = totalDiscount;
        Gtotalplace.innerHTML = grandTotal;

    }
};


function cancel() {
    let TotalCost = document.getElementById('TotalCost');
    const Services = document.getElementsByClassName('serviceContent');

    for (let index = 0; index < Services.length; index++) {
        let subtotal = Services[index].getElementsByClassName('subtotal')[0];
        let tax = Services[index].getElementsByClassName('tax')[0];

        let check = Services[index].getElementsByClassName('checkmark');
        for (let subindex = 0; subindex < check.length; subindex++) {

            if (check[subindex].checked == true) {
                check[subindex].checked = false;
                subtotal.innerHTML='';
                tax.innerHTML ='';
            }
        }
    }
    totalCost = 0;
    totalTax = 0;
    TotalCost.innerHTML = totalCost + totalTax;
}

function InvoiceCancel() {
    localStorage.clear();
    window.location.href = "homePage.html";
}

function exit() {

    window.location.href = "homePage.html";
}

function checkout() {

    localStorage.clear();
    localStorage.setItem("invoice", JSON.stringify(Cart));
}


