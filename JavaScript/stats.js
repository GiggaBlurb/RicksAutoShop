
window.onload = function () {
    const page = document.getElementsByTagName('body')[0].id;
    if (page === 'statspage') {
        ShowUserFrequency();
    }
};

function ShowUserFrequency() {

    var UsersArray = [];//declare userlist Array
    if (localStorage.getItem("RegistrationData") !== null) {//if User List is not null
        UsersArray = JSON.parse(localStorage.getItem("RegistrationData"));//Get User List from local storage
    }


    let GenderChart = document.getElementById("GenderChart");
    let MaxBarHeight = 80;

    const genderdata = [0, 0, 0]


    for (let index = 0; index < UsersArray.length; index++) {//iterate list of user

        if (UsersArray[index].gender === "Male") {
            genderdata[1]++;
        } if (UsersArray[index].gender === "Female") {
            genderdata[0]++;
        } if (UsersArray[index].gender === "Other") {
            genderdata[2]++;
        }

    }

    genderdata.forEach(Total => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = scale(Total) + "px";
        bar.innerHTML = Total;
        GenderChart.append(bar);
    }
    )

    function scale(unscaledNum) {
        return (unscaledNum + 20 / MaxBarHeight) * MaxBarHeight;
    }




};