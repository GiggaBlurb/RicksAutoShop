
const form = document.getElementById('loginForm');

form.addEventListener("submit", function (event) {
    const name = 'Norman';
    const password = 'Norman123'
    const username = document.getElementById('name').value;
    const userpassword = document.getElementById('password').value;
    const Message = document.getElementById('Message');
    event.preventDefault();

    if (name == username && password == userpassword) {
        displayMessage("Login is Succesfull","green")
        window.location.href = "https://www.w3schools.com";
    }
    else {
        displayMessage("Login is Unsuccesfull","red")
    }

    function displayMessage(message,color) {
        Message.innerHTML = message;
        Message.style.color=color;
      }
});





