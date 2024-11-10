
const currentUser = localStorage.getItem("currentUser");

var UsersArray = [];
if (localStorage.getItem("RegistrationData") !== null) {
    UsersArray = JSON.parse(localStorage.getItem("RegistrationData"));
}
const listStart = document.getElementById('start');

let productList = [
    { Name: "Car Service & Maintenance", price: 5000, discription: "Standard Cleaning and Minor repairs ", image: "../images/Maintenance.jpg" },
    { Name: "Oil Change", price: 3000, discription: "Standard Oil Refill and System Maintenance", image: "../images/oil_change.jpg" },
    { Name: "Wheel Alignment", price: 2400, discription: "Wheel checks and Maintenance", image: "../images/wheel.jpg" },
    { Name: "Battery Replacement", price: 4000, discription: "Battery refill and Replacement", image: "../images/battery.jpg" },
    { Name: "Brake Service", price: 3500, discription: "Standard Brake Service and Repairs ", image: "../images/brake.jpg" },
    { Name: "Coolant System", price: 7700, discription: "Standard Coolant Servicing and Maintenance ", image: "../images/coolant.jpg" },
    { Name: "Window Service", price: 1200, discription: "Window Repair and Tint", image: "../images/window.jpg" },
    { Name: "Alarm System", price: 30700, discription: "Window Repair and Tint", image: "../images/alarm.jpg" }
];

localStorage.setItem("AllProducts", JSON.stringify(productList));

for (let index = productList.length - 1; index >= 0; index--) {


    let name = productList[index].Name;
    let cost = productList[index].price;
    let discription = productList[index].discription;
    let imagesrc = productList[index].image;


    let container = document.createElement("div");
    container.classList.add("box");
    container.setAttribute("id", name);

    let header = document.createElement("h2");
    header.classList.add("title")
    header.innerHTML = name;

    container.appendChild(header);

    let right = document.createElement("div");
    right.classList.add("right");

    let form = document.createElement("form");
    form.classList.add("serviceContent");

    let p1 = document.createElement("p");
    p1.classList.add("heading");
    p1.classList.add("title");
    p1.innerHTML = "Price: $" + cost;

    form.appendChild(p1);

    let p2 = document.createElement("p");
    p2.classList.add("title");

    p2.innerHTML = "Discription: " + discription;

    form.appendChild(p2);

    let brk = document.createElement("br");


    form.appendChild(brk);
    form.appendChild(brk);
    form.appendChild(brk);
    form.appendChild(brk);
    form.appendChild(brk);


    let chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox");
    chkbox.setAttribute("id", index);
    chkbox.setAttribute("name", "cart");
    chkbox.setAttribute("Onclick", "addToCart(this)");
    chkbox.classList.add("checkmark");

    form.appendChild(chkbox);

    let label = document.createElement("label");
    label.setAttribute("for", index);
    form.appendChild(brk);
    label.innerHTML = "Add To Cart"
    form.appendChild(label);

    right.appendChild(form);
    container.appendChild(right);

    let left = document.createElement("div");
    left.classList.add("left");

    let image = document.createElement("img");
    image.setAttribute("src", imagesrc);
    image.setAttribute("alt", "Image not found");

    left.appendChild(image);

    container.appendChild(left);

    listStart.insertAdjacentElement("afterend", container);

}


function addToCart(button) {
    if (button.checked) {

        Object.assign(UsersArray[currentUser].cart, productList[button.id]);
    }
    else {
        Object.assign(UsersArray[currentUser].cart, {});
    }

    console.log(UsersArray[currentUser]);
}