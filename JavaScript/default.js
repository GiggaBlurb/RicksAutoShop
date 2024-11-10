//Norman Martin-2300232
//Tutor:Sirisha Badhika

let totalCost = 0;
let totalTax = 0;
const taxRate = .15;
let Cart = [];

window.onload = function () {

    const page = document.getElementsByTagName('body')[0].id;

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


