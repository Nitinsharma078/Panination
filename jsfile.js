const url = 'data.json';
fetch(url)
    .then(data1 =>{
        return data1.json();
    })
    .then((data) => {
        const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
        console.log();
        const paginationDiv = document.getElementById('pagination');
        const searchInput = document.getElementById('searchBar');
        const pageLimit = 10;
        let currentPage = 1;
        let fData = data.users;


        function showData() {
            table.innerHTML = '';
            const startIndex = (currentPage - 1) * pageLimit;
            const endIndex = startIndex + pageLimit;
            const usersToDisplay = fData.slice(startIndex, endIndex);
            if (usersToDisplay.length === 0) {
                const row = table.insertRow();
                const cell = row.insertCell();
                cell.colSpan = "5";
                cell.textContent = "No matching data found.";
            }
            usersToDisplay.map(user => {
                const row = table.insertRow();
                row.innerHTML = `<td>${user.userName}</td>
                                 <td>${user.email}</td>
                                 <td>${user.age}</td>
                                 <td>${user.address}</td>
                                 <td>${user.gender}</td>`;
            });
            if (fData.length > pageLimit) {
                paginationDiv.style.display = 'block';
            } else {
                paginationDiv.style.display = 'none';
            }
        }

        function update() {
            const buttons = paginationDiv.getElementsByTagName('button');
            console.log(currentPage,'nitin');
            for (let i = 0; i < buttons.length; i++) {
                // console.log(buttons[i].textContent = 'Ram','nitin1');
                if (parseInt(buttons[i].textContent) === currentPage) {
                    buttons[i].classList.add('active');
                } else {
                    buttons[i].classList.remove('active');
                }
            }
        }

        function filterData(searchQuery) {
            if (!searchQuery) {
                fData = data.users; // Reset to original data if search query is empty
                return;
            }
            if (!isNaN(searchQuery)) {
                fData = data.users.filter(user => {
                    return user.age.toString() === searchQuery;
                });
            }
            else {
                fData = data.users.filter(user => {
                    return user.userName.toLowerCase().includes(searchQuery) ||
                        user.email.toLowerCase().includes(searchQuery) ||
                        user.age.toString().includes(searchQuery) ||
                        user.address.toLowerCase().includes(searchQuery);
                });
            }
            if (searchQuery.toLowerCase() === 'male') {
                fData = fData.filter(user => {
                    return user.gender.toLowerCase() === 'male';
                });
            }
        }

        function searchData() {
            const searchQuery = searchInput.value.trim().toLowerCase();
            console.log(searchQuery);
            filterData(searchQuery);
            currentPage = 1;
            showData();
            createPB();
            update();
        }

        function createPB() {
            paginationDiv.innerHTML = '';
            const NumberOfPage = Math.ceil(fData.length / pageLimit);
            for (let i = 1; i <= NumberOfPage; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.addEventListener('click', () => {
                    currentPage = i;
                    showData();
                    update();
                });
                paginationDiv.appendChild(button);
            }
        }

        searchInput.addEventListener('keyup', searchData);

        showData();
        createPB();
        update();

    })
    .catch(error => console.error('Error fetching user data:', error));
