async function fetchSingleUser(id){
    let user;
    let userInfoFields;
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(data => {
            user = data;
        });
    userInfoFields = '<h1 class="flex flex-row sticky place-content-between top-0 p-0.5 bg-slate-400/90 rounded w-full text-center border-b-2 border-dotted border-violet-500 font-bold">' +
        '         <!--Close button-->\n' +
        '            <button class="rounded place-self-center bg-slate-700 hover:bg-purple-700/80 h-5 w-5 shadow-lg"' +
        '                    @click="userView=false">\n' +
        '              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="times"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>\n' +
        '            </button>\n' +
        '          <!--End close button-->'
        +
        user.name +
        '</h1>';
    userInfoFields += userInfoFill(user);
    return userInfoFields;
}

// more compact than an iterative approach
function userInfoFill(currentObject){
    let userInfoHTML = '';
    for (let key in currentObject){
        userInfoHTML += '<div>' + '<p class="w-full font-bold">' + key + ': </p>' ;
        if (typeof currentObject[key] === 'object' && currentObject[key] !== null ) {
            userInfoHTML+= '<br>' + userInfoFill(currentObject[key]);
        }else {
            userInfoHTML += '<p>' + currentObject[key] + '</p></div>';
        }
    }
    return userInfoHTML;
}

async function tableUpdate(tableHTML){
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            tableHTML = '<tr>' +
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
                  x-on:click="selectedUser = fetchSingleUser(${user.id}), userView = true"
                  class="border-t-2 hover:outline-2 hover:outline outline-violet-400 hover:rounded border-violet-400"
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