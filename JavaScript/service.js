
const currentUser = localStorage.getItem("currentUser");//index of cuurent user logged in

var UsersArray = [];//declare userlist Array
if (localStorage.getItem("RegistrationData") !== null) {//if User List is not null
    UsersArray = JSON.parse(localStorage.getItem("RegistrationData"));//Get User List from local storage
}
const listStart = document.getElementById('start');//postion in document to insert products

//array of prodcut objects
let productList = [
    { Name: "Car Service & Maintenance", price: 5000,drate:.05 ,discription: "Standard Cleaning and Minor repairs ", image: "../images/Maintenance.webp" },
    { Name: "Oil Change", price: 3000,drate:.02 , discription: "Standard Oil Refill and System Maintenance", image: "../images/oil_change.webp" },
    { Name: "Wheel Alignment", price: 2400,drate:.03, discription: "Wheel checks and Maintenance", image: "../images/wheel.webp" },
    { Name: "Battery Replacement", price: 4000,drate:.04, discription: "Battery refill and Replacement", image: "../images/battery.webp" },
    { Name: "Brake Service", price: 3500,drate:.02, discription: "Standard Brake Service and Repairs ", image: "../images/brake.webp" },
    { Name: "Coolant System", price: 7700,drate:.012, discription: "Standard Coolant Servicing and Maintenance ", image: "../images/coolant.webp" },
    { Name: "Window Service", price: 1200,drate:.05 ,discription: "Window Repair and Tint", image: "../images/window.webp" },
    { Name: "Alarm System", price: 30700,drate:0.1, discription: "Window Repair and Tint", image: "../images/alarm.webp" }
];
//save product to local storage
localStorage.setItem("AllProducts", JSON.stringify(productList));

for (let index = productList.length - 1; index >= 0; index--) {// for all products in product list
    
    let name = productList[index].Name;//name of service 
    let cost = productList[index].price;//price of service
    let discription = productList[index].discription;// service discription
    let imagesrc = productList[index].image; //serivice image source

    //create various elements to display service details
    let container = document.createElement("div");
    container.classList.add("box");
    container.setAttribute("id", name);

    let header = document.createElement("h2");
    header.classList.add("title")
    header.innerHTML = name;

    

    let right = document.createElement("div");
    right.classList.add("box-left");

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

    let chkbox = document.createElement("input");//checkbox input to select service
    chkbox.setAttribute("type", "checkbox");
    chkbox.setAttribute("id", index);
    chkbox.setAttribute("name", "cart");
    chkbox.setAttribute("Onclick", "addToCart(this)");
    chkbox.classList.add("checkmark");

    if (typeof UsersArray[currentUser].cart.servicelist !== 'undefined'){

        if(   UsersArray[currentUser].cart.servicelist.find(o => o.name === name)  ){//if user Has already selected current service
            chkbox.checked=true;//select the checkbox to prevent duplicates
        }
    }

    form.appendChild(chkbox);

    let label = document.createElement("label");
    label.setAttribute("for", index);
    form.appendChild(brk);
    label.innerHTML = "Add To Cart"
    form.appendChild(label);
    right.appendChild(header);
    right.appendChild(form);
    container.appendChild(right);

    let left = document.createElement("div");
    left.classList.add("box-left");

    let image = document.createElement("img");
    image.setAttribute("src", imagesrc);
    image.setAttribute("alt", "Image not found");

    left.appendChild(image);

    container.appendChild(left);

    listStart.insertAdjacentElement("afterend", container);

}


function addToCart(button) {//when add to cart checkbox is clicked

    let prod=productList[button.id];//get details of prodct selected
    let cart =  UsersArray[currentUser].cart;//get the cart of the user currently logged in

    //create an array for product details along with the taxes, discounts, subtotal and current total cost. 
    let prodDetails={
        name:prod.Name,
        cost:prod.price,
        discountRate:prod.drate*100+" %",
        discount:prod.drate*prod.price,
        tax:prod.price*.15

    };

    if (button.checked) {//when product checkbox is selected
        //add service to cart and calculate tax,discount,subtoatal
        cart.servicelist.push(prodDetails);
        cart.totalDiscount+=prodDetails.discount;
        cart.totalTax+=prodDetails.tax;
        cart.subTotal+=prodDetails.cost;
        cart.total+= (prodDetails.cost+prodDetails.tax)-prodDetails.discount;

    }
    else {//when product checkbox is UNselected
        //remove Service from cart and calculate tax,discount,subtoatal
        cart.totalDiscount-=prodDetails.discount;
        cart.totalTax-=prodDetails.tax;
        cart.subTotal-=prodDetails.cost;
        cart.total-= (prodDetails.cost+prodDetails.tax)-prodDetails.discount;
       cart.servicelist=cart.servicelist.filter(function(e) { return e.name !== prod.Name });
    }

    //update user Cart
    UsersArray[currentUser].cart=cart;
    localStorage.setItem("RegistrationData",JSON.stringify(UsersArray));
    console.log(UsersArray[currentUser]);
}