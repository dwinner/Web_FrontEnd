let authHeaders = new Headers();
// Don't use Basic auth unless it is over an HTTPS connection.
authHeaders.set("Authorization",
                `Basic ${btoa(`${username}:${password}`)}`);

function displayAllUsers(usersList)
{
   console.log(usersList);
}

fetch("/api/users/", {headers: authHeaders})
   .then(response => response.json())             // Error handling omitted...
   .then(usersList => displayAllUsers(usersList));
