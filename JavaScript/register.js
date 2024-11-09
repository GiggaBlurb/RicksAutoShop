
const form = document.getElementById('register');
const Message = document.getElementById('Message');
const phone = document.getElementById('phone');
const trn = document.getElementById('trn');

const User = {
    trn: '',
    firstName: "",
    lastname: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    cart: {},
    invoices: []
};

var UsersArray = [];
if (localStorage.length != 0) {
    UsersArray=JSON.parse(localStorage.getItem("RegistrationData"));
}



console.log(UsersArray);


form.addEventListener("submit", function (event) {
    event.preventDefault();

    User.firstName = document.getElementById('fname').value;
    User.lastname = document.getElementById('lname').value;
    User.dob = document.getElementById('dob').value
    User.gender = document.querySelector('input[name="gender"]:checked').value;
    User.phone = document.getElementById('phone').value;
    User.email = document.getElementById('email').value
    User.password = document.getElementById('password').value
    User.trn = trn.value;
    trn.value = trn.value.replace(/[\(\)\-\' ']/g, '');





    if (isNaN(User.phone.replace(/[\(\)\-\' ']/g, ''))) {
        phone.value = '';
        displayMessage("Telephone number is Invalid", "red");
        phone.style.borderColor = "red";
    }
    else {
        phone.style.borderColor = "silver";

        if (isNaN(trn.value)) {
            trn.value = '';
            displayMessage("TRN  is Invalid", "red");
            trn.style.borderColor = "red";
        }
        else {
            UsersArray.push(User);
            localStorage.setItem("RegistrationData", JSON.stringify(UsersArray));

            displayMessage("Successfull", "green");
            trn.style.borderColor = "silver";
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 1000);


        }
    }

    console.log(User);
});



phone.addEventListener("keydown", (e) => {//format Phone Number input
    if (e.key === "Backspace" || e.key === "Delete") return;


    if (e.target.value.length === 1) {
        phone.value = phone.value + " (";
    }
    if (e.target.value.length === 6) {
        phone.value = phone.value + ") ";
    }
    if (e.target.value.length === 11) {
        phone.value = phone.value + " - ";
    }

});

trn.addEventListener("keydown", (e) => {//format Trn input
    if (e.key === "Backspace" || e.key === "Delete") return;


    if (e.target.value.length === 3) {
        trn.value = trn.value + "-";
    }
    if (e.target.value.length === 7) {
        trn.value = trn.value + "-";
    }
});



function displayMessage(message, color) {

    Message.innerHTML = message;
    Message.style.color = color;
}


function validateAge(dob) {//Ensure User is 18 or older
    let currentDate = new Date();
    let bornDate = new Date(dob.value);

    let age = Math.floor((currentDate - bornDate) / 3.1536E+10);//get user age at current date

    if (age < 18) {
        displayMessage("User must be 18 or Older to enter", "red");
        dob.value = null;
    }
    dob.style.borderColor = (age < 18) ? "red" : "silver";
}


function checkTRN(trn) {//Ensure TRN is unique

    alert(trn.value);
    for (let index = 0; index < UsersArray.length; index++) {


        if (UsersArray[index].trn === trn.value) {
            displayMessage("User is Already Registered", "red");
            trn.value = null;
        }

    }
}
