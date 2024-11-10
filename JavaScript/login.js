
let attemps = 0;

const form = document.getElementById('loginForm');
const trn = document.getElementById('trn');
const Message = document.getElementById('Message');

var UsersArray = [];
if (localStorage.getItem("RegistrationData") !== null) {
    UsersArray = JSON.parse(localStorage.getItem("RegistrationData"));
}


form.addEventListener("submit", function (event) {
    event.preventDefault();
    const usertrn = trn.value;
    trnNUM=trn.value.replace(/[\(\)\-\' ']/g, '');
    const userpassword = document.getElementById('password').value;

    if (isNaN(trnNUM)) {
        trn.value = '';
        displayMessage("TRN  is Invalid", "red");
        trn.style.borderColor = "red";
    }
    else {
     
        checkPassword(usertrn,userpassword);
        attemps++;
    }

    if (attemps == 3) {
        window.location.href = "./webpages/errorPage.html";

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


function checkPassword(trnNUm, pass) {
    
    for (let index = 0; index < UsersArray.length; index++) {

        if (UsersArray[index].trn === trnNUm && UsersArray[index].password===pass) {
            displayMessage("Login Successfull", "green");
            trn.style.borderColor = "silver";

            localStorage.setItem("currentUser",index);
            
            setTimeout(() => {
                window.location.href = "./webpages/homePage.html";
            }, 1000);
            
            return;
        }
        else {
            displayMessage("Login Unsuccesfull", "red");
            trn.style.borderColor = "red";
           
        }

    }
}