//Norman Martin-2300232
//Tutor:Sirisha Badhika

let totalCost=0;
let totalTax=0;
const taxRate=.15;


window.onload = function () {

    const page = document.getElementsByTagName('body')[0].id;

    if (page == 'loginPage') {

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
            let check = Services[index].getElementsByClassName('checkmark');
            let tax = Services[index].getElementsByClassName('tax')[0];
            let subtotal = Services[index].getElementsByClassName('subtotal')[0];
            let TotalCost=document.getElementById('TotalCost');

            for (let subindex = 0; subindex < check.length; subindex++) {

                check[subindex].addEventListener("click", function (e) {
                    var sub = parseFloat(subtotal.innerHTML);


                    if (isNaN(sub)) {
                        sub = 0;
                        var serviceTax = 0;
                    }
                    
                    var serviceCost = parseFloat(cost[subindex].innerHTML.replace('$', ''));

                    if (check[subindex].checked == true) {
                        sub = sub + serviceCost;
                        totalCost+=serviceCost;
                        
                       
                    }
                    else {
                        sub = sub - serviceCost;
                        totalCost-=serviceCost;

                    }
                    serviceTax = (sub * taxRate);
                    totalTax= (totalCost*taxRate)
                    tax.innerHTML = serviceTax;
                    subtotal.innerHTML = sub;
                    
                   TotalCost.innerHTML=totalCost+totalTax;



                });

            }
               

        }

    }
};








