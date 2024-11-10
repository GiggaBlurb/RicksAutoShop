
const form = document.getElementById('reset');
const trn = document.getElementById('trn');


var UsersArray = [];
if (localStorage.length != 0) {
    UsersArray = JSON.parse(localStorage.getItem("RegistrationData"));
}

console.log(UsersArray);


form.addEventListener("submit", function (event) {
    event.preventDefault();

    let password = document.getElementById('password').value
    let trnNUm = trn.value.replace(/[\(\)\-\' ']/g, '');

    if (isNaN(trnNUm)) {
        trn.value = '';
        displayMessage("TRN  is Invalid", "red");
        trn.style.borderColor = "red";
    }
    else {

        setPassword(trn.value, password);

        setTimeout(() => {
            window.location.href = "../index.html"
        }, 1000);
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


function setPassword(trnNUm, pass) {
    
    for (let index = 0; index < UsersArray.length; index++) {

        if (UsersArray[index].trn === trnNUm) {
            displayMessage("User Found Password Updated", "green");
            UsersArray[index].password = pass;
            localStorage.setItem("RegistrationData", JSON.stringify(UsersArray));
            trn.style.borderColor = "silver";
            return;
        }
        else {
            displayMessage("User Not found", "red");
            trn.style.borderColor = "red";
        }

    }
}
