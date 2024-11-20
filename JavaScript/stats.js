
window.onload = function () {
    const page = document.getElementsByTagName('body')[0].id;
    if (page === 'statspage') {
        ShowUserFrequency();
       ShowInvoices();
    }
};

        function ShowUserFrequency() {
            const userData = JSON.parse(localStorage.getItem("UserData")) || [];
            const genderCounts = { Male: 0, Female: 0, Other: 0 };
            const ageGroupCounts = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };

            userData.forEach(user => {
                if (user.gender && genderCounts[user.gender] !== undefined) {
                    genderCounts[user.gender]++;
                }

                const age = user.age;
                if (age >= 18 && age <= 25) ageGroupCounts["18-25"]++;
                else if (age >= 26 && age <= 35) ageGroupCounts["26-35"]++;
                else if (age >= 36 && age <= 50) ageGroupCounts["36-50"]++;
                else if (age > 50) ageGroupCounts["50+"]++;
            });

            const genderContainer = document.getElementById('GenderChart');
            Object.keys(genderCounts).forEach(gender => {
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${genderCounts[gender] * 30}px`;
                bar.innerHTML = genderCounts[gender];
                genderContainer.appendChild(bar);
            });

            const ageContainer = document.getElementById('AgeChart');
            Object.keys(ageGroupCounts).forEach(ageGroup => {
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${ageGroupCounts[ageGroup] * 30}px`;
                bar.innerHTML = ageGroupCounts[ageGroup];
                ageContainer.appendChild(bar);
            });
        }

        function ShowInvoices() {
            const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
            const searchQuery = document.getElementById("searchAllInvoices").value.trim().toLowerCase();
            const filteredInvoices = searchQuery
                ? allInvoices.filter(invoice => 
                    invoice.trn.toLowerCase().includes(searchQuery) ||
                    invoice.InvoiceNumber.toLowerCase().includes(searchQuery))
                : allInvoices;

            const tableBody = document.querySelector("#invoicesTable tbody");
            tableBody.innerHTML = "";

            filteredInvoices.forEach(invoice => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${invoice.InvoiceNumber}</td>
                    <td>${invoice.trn}</td>
                    <td>${invoice.date}</td>
                    <td>${invoice.total}</td>
                `;
                tableBody.appendChild(row);
            });
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
                    <td>${invoice.InvoiceNumber}</td>
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
                    invoice.InvoiceNumber.toLowerCase().includes(searchQuery))
                : userInvoices;

            const tableBody = document.querySelector("#userInvoicesTable tbody");
            tableBody.innerHTML = "";

            filteredUserInvoices.forEach(invoice => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${invoice.InvoiceNumber}</td>
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
