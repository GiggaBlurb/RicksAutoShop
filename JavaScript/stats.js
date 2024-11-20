
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
    let MinBarHeight =20;

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

    //scales bar height 
    function scale(unscaledNum) {
        return (unscaledNum + MinBarHeight / MaxBarHeight) * MaxBarHeight;
    }


    /* JavaScript for Charts */

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("RegistrationData")) || [];  
    let currentDate = new Date();//get current date
  

    // Initialize counters for gender and age groups
    const genderCounts = { Male: 0, Female: 0, Other: 0 };
    const ageGroupCounts = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };

    // Loop through the user data and populate the counts
    userData.forEach(user => {
        // Count genders
        if (user.gender && genderCounts[user.gender] !== undefined) {
            genderCounts[user.gender]++;
        }


        let bornDate = new Date(user.dob);//create ne Date from user input

        // Count age groups
        //age is not stored in Userdata use the dob to calculate
        const age =Math.floor((currentDate - bornDate) / 3.1536E+10);//calculate users Age;

        if (age >= 18 && age <= 25) {
            ageGroupCounts["18-25"]++;
        } else if (age >= 26 && age <= 35) {
            ageGroupCounts["26-35"]++;
        } else if (age >= 36 && age <= 50) {
            ageGroupCounts["36-50"]++;
        } else if (age > 50) {
            ageGroupCounts["50+"]++;
        }
    });


    // Create Age Group Chart
    const ageContainer = document.getElementById('AgeChart');
    Object.keys(ageGroupCounts).forEach(ageGroup => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = scale(ageGroupCounts[ageGroup]) + "px";
        bar.innerHTML = ageGroupCounts[ageGroup];
        ageContainer.appendChild(bar);
    });
 function ShowInvoices() {
            const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
            const searchQuery = document.getElementById("searchAllInvoices").value.trim().toLowerCase();
            const filteredInvoices = searchQuery
                ? allInvoices.filter(invoice => 
                    invoice.trn.toLowerCase().includes(searchQuery) ||
                    invoice.id.toLowerCase().includes(searchQuery))
                : allInvoices;

            const tableBody = document.querySelector("#invoicesTable tbody");
            tableBody.innerHTML = "";

            filteredInvoices.forEach(invoice => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${invoice.id}</td>
                    <td>${invoice.trn}</td>
                    <td>${invoice.date}</td>
                    <td>${invoice.total}</td>
                `;
                tableBody.appendChild(row);
            });

            console.log(filteredInvoices);
        }

        function GetUserInvoices() {
            const userTRN = localStorage.getItem("RegisterData") || "";
            const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
            const userInvoices = allInvoices.filter(invoice => invoice.trn === userTRN);

            const tableBody = document.querySelector("#userInvoicesTable tbody");
            tableBody.innerHTML = "";

            userInvoices.forEach(invoice => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${invoice.id}</td>
                    <td>${invoice.trn}</td>
                    <td>${invoice.date}</td>
                    <td>${invoice.total}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        function SearchUserInvoices() {
            const searchQuery = document.getElementById("searchUserInvoices").value.trim().toLowerCase();
            const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
            const userTRN = localStorage.getItem("RegisterData") || "";
            const userInvoices = allInvoices.filter(invoice => invoice.trn === userTRN);
            const filteredUserInvoices = searchQuery
                ? userInvoices.filter(invoice => 
                    invoice.id.toLowerCase().includes(searchQuery))
                : userInvoices;

            const tableBody = document.querySelector("#userInvoicesTable tbody");
            tableBody.innerHTML = "";

            filteredUserInvoices.forEach(invoice => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${invoice.id}</td>
                    <td>${invoice.trn}</td>
                    <td>${invoice.date}</td>
                    <td>${invoice.total}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Call the initial functions
        ShowUserFrequency();
        GetUserInvoices();

};
