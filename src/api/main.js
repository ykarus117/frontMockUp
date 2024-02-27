async function fetchSingleUser(id){
    let user;
    let userInfoFields;
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(data => {
            user = data;
        });
    userInfoFields = '<h1 class="flex flex-row sticky place-content-between top-0 p-0.5 pr-2 shadow-lg rounded bg-yellow-500 w-full text-center border-violet-500 font-bold">' +
        '         <!--Close button-->\n' +
        '            <button class="rounded-full place-self-center hover:outline hover:outline-2 hover:outline-purple-500 bg-purple-800 h-5 w-5"' +
        '                    @click="userView=false, tableView=true">\n' +
        '              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="times"><path fill="white" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>\n' +
        '            </button>\n' +
        '          <!--End close button-->'
        +
        user.name +
        '</h1>';
    userInfoFields += userInfoFill(user);
    userInfoFields += `<button class="sticky bottom-1 bg-yellow-500 w-1/2 place-self-center rounded-full">Save</button>`
    return userInfoFields;
}

// more compact than an iterative approach
function userInfoFill(currentObject){
    let userInfoHTML = '';
    for (let key in currentObject){
        if (typeof currentObject[key] === 'object' && currentObject[key] !== null ) {
            let uppedKey = key[0].toUpperCase() + key.slice(1);
            userInfoHTML +=
                // button to toggle the visibility of the nested object
                `<button class="bg-violet-400 outline-yellow-600 hover:outline outline-1 hover:shadow rounded-md border-violet-500 w-full text-center font-bold" 
                  @click="$refs.${uppedKey}.classList.toggle('hidden')"
                  >${uppedKey}</button>
                  <div x-ref="${uppedKey}" class="bg-violet-300 pb-1 mb-2 mx-1.5 shadow-lg rounded">`;
            userInfoHTML += userInfoFill(currentObject[key]);
            userInfoHTML += '</div>';
        }else {
            userInfoHTML +=
                '<div class="flex flex-col pb-1 pt-1 bg-violet-300">' +
                '<p class="w-full text-center font-bold">' +
                key +
                ': </p>' +
                `<input type="text" value="${currentObject[key]}" class="place-self-center bg-gray-200 w-2/3 select-auto rounded text-center text-wrap"> </div>`;
        }
    }
    return userInfoHTML;
}

async function tableUpdate(tableHTML) {
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            tableHTML = '<tr class="rounded outline outline-1 outline-white bg-gold-400">' +
                '<th>ID</th>' +
                '<th>Name</th>' +
                '<th>Username</th>' +
                '<th>Email</th>' +
                '<th>Address</th>' +
                '<th>Phone</th>' +
                '<th>Website</th>' +
                '<th>Company</th>' +
                '</tr>';
            data.forEach(user => {
                tableHTML += `<tr
                  x-on:click="selectedUser = fetchSingleUser(${user.id}), userView = true, tableView = window.innerWidth >= 500"
                  class="odd:bg-violet-300 border-white border-b -outline-offset-1 even:bg-violet-400 outline-2 hover:outline hover:rounded outline-yellow-600"
                  >
                  <td>${user.id}</td>
                  <td>${user.name}</td>
                  <td>${user.username}</td>
                  <td>${user.email}</td>
                  <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td>
                  <td>${user.phone}</td>
                  <td>${user.website}</td>
                  <td class="">${user.company.name}</td>
                  </tr>`;
            });
        });
    return tableHTML;
}

async function userSearch(search) {
    let filteredUsers = [''];
    if (search.length > 0) {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                let users;
                users = data;
                users.forEach(user => {
                    if (user.name.toLowerCase().includes(search.toLowerCase())) {
                        filteredUsers.push(user);
                    }
                });
            });
        return filteredUsers;
    }else{
        return null;
    }
}