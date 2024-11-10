const Services = document.getElementsByClassName('serviceContent');

let product = [
    {Name:"Car Service & Maintenance",price:"5000",discription:"Standard Cleaning and Minor repairs ",image:"../images/Maintenance.jpg"},


];


if (localStorage.length != 0) {
    UsersArray=JSON.parse(localStorage.getItem("RegistrationData"));
}

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