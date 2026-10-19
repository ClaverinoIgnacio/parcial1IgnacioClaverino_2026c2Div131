const jsonUsuarios = [
    {username : "amy.lee", FirstName: "Amy", phone: "11223344", email:"amy.lee@example.com"},
    {username : "angela.lewis", FirstName: "Angela", phone: "63523833", email:"angela.lewis@example.com"},
    {username : "AppianRPA.sa", FirstName: "AppianRPA.sa", phone: "11118877", email:""},
    {username : "charles.parker", FirstName: "Charles", phone: "25267642", email:"charles.parker@example.com"},
    {username : "chris.watkins", FirstName: "Chris", phone: "22229999", email:"chris.watkins@example.com"},
    {username : "community.admin", FirstName: "Community", phone: "33338887", email:"community.admin@fake.com"},
    {username : "edward.phillips", FirstName: "Edward", phone: "73733737", email:"edward.phillips@example.com"},
    {username : "joseph.clark", FirstName: "Joseph", phone: "11455461", email:"joseph.clark@example.com"},
    {username : "karen.anderson", FirstName: "Karen", phone: "91191144", email:""},
    {username : "martin.morgan", FirstName: "Martin", phone: "11119999", email:"martin.morgan@example.com"},
    {username : "mary.lawson", FirstName: "Mary", phone: "23234545", email:"mary.lawson@example.com"}
]

localStorage.setItem("usuarios" , JSON.stringify(jsonUsuarios));

function obtenerUsuarios() {
    const datos = JSON.parse(localStorage.getItem("usuarios"));
    return datos ? datos : jsonUsuarios;
}

const usuariosStorage = obtenerUsuarios();
console.table(usuariosStorage);

document.addEventListener("DOMContentLoaded",() => {
    const tituloUsers = document.querySelector(".user-section h2");
    const inputBusqueda = document.querySelector(".search-box input");

    if(tituloUsers) {
        tituloUsers.addEventListener("click", () => {
            renderizarTabla(obtenerUsuarios());
        });
    }
    if(inputBusqueda) {
        inputBusqueda.addEventListener("keyup", (e) => {
            const textoBusqueda = e.target.value.toLowerCase();
            const todosLosUsuarios = obtenerUsuarios();

            const usuariosFiltrados = todosLosUsuarios.filter(u =>
                u.username.toLowerCase().includes(textoBusqueda) ||
                u.FirstName.toLowerCase().includes(textoBusqueda) ||
                u.email.toLowerCase().includes(textoBusqueda)
            );
            
            renderizarTabla(usuariosFiltrados);
        });
    }
});


function renderizarTabla(arrayUsuarios) {
    const container = document.getElementById("users-container");
    if(!container) return;
    container.innerHTML = "";


if (arrayUsuarios.length === 0) {
    container.innerHTML = "<p style= 'padding : 20px; font-weight: bold;'>No se econtraron usuarios</p>";
    return;
}

const tabla = document.createElement("table");

tabla.innerHTML = `
        <thead> 
            <tr>
                <th><input type="checkbox"></th>
                <th></th>
                <th>username</th>
                <th>FirstName</th>
                <th>phone</th>
                <th>email</th>
            </tr>
        </thead>
        <tbody id = "body-tabla"></tbody>
`;

container.appendChild(tabla);
const tbody = document.getElementById("body-tabla");

arrayUsuarios.forEach(u => {
    const tr = document.createElement("tr");


tr.innerHTML = `
        <td><input type="checkbox"></td>
        <td><img src="https://via.placeholder.com/30" alt="avatar" style="border-radius": 50%; width: 30px; height: 30px; object-fit:cover;"></td>
        <td class="username-cell">{u.username}</td>
        <td>${u.FirstName}</td>
        <td>${u.phone}</td>
        <td>${u.email}</td>
`;

tbody.appendChild(tr);


});
}
